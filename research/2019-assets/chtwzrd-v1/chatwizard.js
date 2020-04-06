/**
 * @title WET-BOEW Chat Wizard plugin container
 * @overview Plugin used to translate a form into a conversational form, hence a Chat Wizard
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @gormfrank
 */

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-chtwzrd",
	selector = "." + componentName,
	replacement = componentName + "-replace", 
	$document = $( "document" ),
	datainput = {},
	timeValues = {},
	waitingForAnswer, 
	formType,
	isInline,
	redirurl, 
	first, 
	intro, 
	current,
	waitTimeout, 
	inputsTimeout, 
	sendBtn,
	i18nDict = {
		en: {
			"chtwzrd-send": "Send<span class='wb-inv'> reply and continue</span>",
			"chtwzrd-toggle": "Switch to wizard",
			"chtwzrd-notification": "Close chat notification",
			"chtwzrd-open": "Open chat wizard",
			"chtwzrd-minimize": "Minimize chat wizard",
			"chtwzrd-history": "Conversation history",
			"chtwzrd-reply": "Reply",
			"chtwzrd-controls": "Controls",
			"chtwzrd-toggle-basic": "Switch to basic form",
			"chtwzrd-waiting": "Waiting for message",
			"chtwzrd-answer": "You have answered:"
		},
		fr: {
			"chtwzrd-send": "Envoyer<span class='wb-inv'> la réponse et continuer</span>",
			"chtwzrd-toggle": "Basculer vers l&apos;assistant",
			"chtwzrd-notification": "Fermer la notification de discussion",
			"chtwzrd-open": "Ouvrir l&apos;assistant de discussion",
			"chtwzrd-minimize": "Réduire l&apos;assistant de discussion",
			"chtwzrd-history": "Historique de discussion",
			"chtwzrd-reply": "Répondre",
			"chtwzrd-controls": "Contrôles",
			"chtwzrd-toggle-basic": "Basculer vers le formulaire",
			"chtwzrd-waiting": "En attente d&apos;un message",
			"chtwzrd-answer": "Vous avez répondu&nbsp;:"
		}
	},

	/**
	 * Prepare initiation depending on the input type, wether it's JSON or a form
	 * @method fireChtwzrd
	 * @param {jQuery DOM element} $selector Element to which the wizard will be appended
	 */
	fireChtwzrd = function( $selector ) {

		// Grab JSON File, parse and create
		if( $selector.data( componentName + "-src" ) ) {
			var data = $selector.data( componentName + "-src" );
			$.getJSON( data, function( json ) {
				datainput = json;
				buildBasicForm( $selector, datainput );
				initiateChtwzrd( $selector );
			} );
		// Start from a form on the page
		} else {
			datainput = convertToObject( $selector );
			initiateChtwzrd( $selector );
		}
	},

	/**
	 * Initiate chat wizard experience
	 * @method initiateChtwzrd
	 * @param {jQuery DOM element} $selector Element to which the wizard will be appended
	 */
	initiateChtwzrd = function( $selector ) {
		// Prevent on load flick and identify basic form
		$selector.removeClass( "hidden wb-inv" ).addClass( componentName + "-basic" );

		// Initiate default values
		timeValues = {
			shortDelay: 500,
			mediumDelay: 750, 
			longDelay: 1250,
			xLongDelay: 2000,
			xxLongDelay: 2500
		};
		waitingForAnswer = false;
		first = datainput.header.first;
		intro = ( datainput.header.instructions ? datainput.header.instructions : "" );
		redirurl = datainput.header.defaultDestination;
		current = datainput.questions[ first ];
		formType = datainput.header.formType ? datainput.header.formType : "dynamic";
		isInline = datainput.header.inline ? true : false;

		// Initiate dictionary
		i18nDict = i18nDict[ $( "html" ).attr( "lang" ) || "en" ];
		i18nDict = {
			send: i18nDict[ "chtwzrd-send" ],
			toggle: i18nDict[ "chtwzrd-toggle" ],
			notification: i18nDict[ "chtwzrd-notification" ],
			trigger: i18nDict[ "chtwzrd-open" ],
			minimize: i18nDict[ "chtwzrd-minimize" ],
			conversation: i18nDict[ "chtwzrd-history" ],
			reply: i18nDict[ "chtwzrd-reply" ],
			controls: i18nDict[ "chtwzrd-controls" ],
			toggleBasic: i18nDict[ "chtwzrd-toggle-basic" ],
			waiting: i18nDict[ "chtwzrd-waiting" ],
			answer: i18nDict[ "chtwzrd-answer" ]
		};

		// Build chat wizard
		buildChtwzrd( $selector, datainput.header.title );

		// All the commonly used elements
		var $basic = $( selector + "-basic" ), 
			$bubble = $( selector + "-bubble-wrap" ), 
			$container = $( selector + "-container" ), 
			$form = $( ".body", $container ),
			$conversation = $( ".history", $container ),
			$minimize = $( ".minimize", $container ),
			$basiclink = $( ".basic-link", $container ),
			$focusedBeforechtwzrd,
			$firstTabStop = $minimize,
			$lastTabStop = $basiclink;

		// Initiate basic form
		initiateBasicForm( $basic );

		// Initiate chat wizard bubble
		initiateBubble( $bubble );

		// Show basic form and hide chat wizard
		$basiclink.on( "click", function( event ) {
			event.preventDefault();

			var $legendFocus = $( "legend:first", $basic );
			$legendFocus.attr( "tabindex", "0" );

			$conversation.attr( "aria-live", "" );
			toggleExperience( $basic, "form" );

			$container.stop().hide();
			$basic.stop().show(function(){
				$legendFocus.focus();
				$legendFocus.removeAttr( "tabindex" );
			});

			$( "body" ).removeClass( componentName + "-noscroll" );
		} );

		// Show chat wizard and hide basic form
		$( selector + "-link" ).on( "click", function( event ) {
			event.preventDefault();

			$basic.stop().hide();
			$focusedBeforechtwzrd = $( ":focus" );

			if( !$( this ).hasClass( componentName + "-bubble" ) ) {
				toggleExperience( $container, "wizard" );
			}
			$( ".bubble", $bubble ).removeClass( "trans-pulse" );
			$( "p", $bubble ).hide().removeClass( "trans-left" );

			$container.stop().show();
			$bubble.stop().hide();
			if ( !isInline ) {
				$( "body" ).addClass( componentName + "-noscroll" );
			}
			if( $conversation.length ) {
				$( ".conversation", $container ).scrollTop( $conversation[ 0 ].scrollHeight );
			}
			if( !waitingForAnswer ) {
				appendInteraction( $form );
			}
		});

		if( isInline ) {
			$( selector + "-link" ).click();
		} else {
		
			// Listen for and trap the keyboard
			$container.on( 'keydown', function( event ) {
				// Check for TAB key press, cycle through
				if( event.keyCode === 9 ) {
					if( event.shiftKey ) {
						if( $firstTabStop.is( ':focus' ) ) {
							event.preventDefault();
							$lastTabStop.focus();
						}
					} else {
						if( $lastTabStop.is( ':focus' ) ) {
							event.preventDefault();
							$firstTabStop.focus();
						}
					}
				}
				// ESCAPE, close
				if ( event.keyCode === 27 ) {
					$minimize.click();
				}
			} );
		}

		// On chat button pressed: append answer, and on submit: redirect
		$document.on( "click", selector + "-container .btn-send", function( event ) {
			if( $( this ).attr( "type" ) != "submit" ) {
				event.preventDefault();
				var $choiceselected = $( "input:checked", $form );
				if( !$choiceselected.length ) {
					$choiceselected = $( "input:first", $form );
					$choiceselected.attr( "checked", true );
				}
				appendReply( $form, cookAnswerObj( $choiceselected ), false );
			}
		} );

		// Minimize chat wizard
		$minimize.on( "click", function( event ) {
			event.preventDefault();
			$container.stop().hide();
			$bubble.stop().show();
			$( "body" ).removeClass( componentName + "-noscroll" );

			// Set focus back to element that had it before the modal was opened
			$focusedBeforechtwzrd.focus();
		} );
	},

	/**
	 * Initiate basic form
	 * @method initiateBasicForm
	 * @param {jQuery DOM element} $selector Element to which the basic form will be appended
	 */
	initiateBasicForm = function( $selector ) {
		var $basicForm = $( "form", $selector ),
			$allQuestions = $( "fieldset", $selector ),
			$firstQuestion = $allQuestions.first();

		if( formType == "dynamic" ) {
			$firstQuestion.addClass( componentName + "-first-q" );
			$allQuestions.not( selector + "-first-q" ).hide();
		}
		// Hide and restart fresh on reload
		$selector.hide();
		$( "input", $basicForm ).prop( "checked", false );

		// Add link to chat from the basic form
		$basicForm.append( '<button class="btn btn-sm btn-link ' + componentName + '-link mrgn-rght-sm">' + i18nDict.toggle + '</button>' );

		// On input change in the basic form
		$( "input", $basicForm ).on( "change", function() {
			var answerData = cookAnswerObj( $( this ) ),
				$qNext = $( "#" + answerData.qNext, $basicForm );

			// Dynamically append next question on checked
			if( formType == "dynamic" ) {
				var $fieldset = $( this ).closest( "fieldset" );
				if( $qNext.is( ":hidden" ) || $fieldset.next().attr( "id" ) != $qNext.attr( "id" ) || answerData.qNext == "none" ) {
					$fieldset.nextAll( "fieldset" ).hide().find( "input" ).prop( "checked", false );
				}
				if( answerData.qNext != "none" ) {
					$( "#" + answerData.qNext ).show();
				}
				if( answerData.url != "" ) {
					$basicForm.attr( "action", answerData.url );
				}
			}
		} );
	},

	/**
	 * Initiate chat wizard bubble
	 * @method initiateBubble
	 * @param {jQuery DOM element} $selector Element which is the actual bubble
	 */
	initiateBubble = function( $selector ) {
		var $footer = $( "#wb-info" ),
			$link = $( selector + "-link", $selector );

		// Change to custom avatar if provided
		if( datainput.header.avatar ) {
			$link.css( "background-image", "url(" + datainput.header.avatar + ")" );
		}

		// Hide basic form on load, show chat bubble instead
		$selector.fadeIn( "slow" );

		// Add some white space over the footer for the bubble to sit
		$footer.addClass( componentName + "-mrgn" );

		// Ensure that the bubble does not go passed the footer
		if( $footer.length ) {

			// Keep the bubble sticky while scrolling Y until user reaches the footer
			var stickyUntilFooter = function( $element ) {

				// Equals to bubble default bottom value in CSS
				var bottomY = 30;

				if ( $( window ).scrollTop() >= $( document ).outerHeight() - $( window ).outerHeight() - $footer.outerHeight() ) {
					$element.css( {	
						bottom: ( $footer.outerHeight() - ( $( document ).outerHeight() - $( window ).outerHeight() - $( window ).scrollTop() ) + bottomY )
					} );
				} else {
					$element.css( {	
						bottom: bottomY
					} );
				}
			}

			// Correct bubble positionning on load, on resize an on Y scroll if necessary
			stickyUntilFooter( $selector );

			$( window ).on( "resize scroll", function() {
				stickyUntilFooter( $selector );
			} );
		}

		// Open Chat from the notification message
		$( ".notif", $selector ).on( "click", function() {
			$link.click();
		} );

		// Close notification aside bubble
		$( ".notif-close", $selector ).on( "click", function (event) {
			event.preventDefault();
			$( this ).parent().hide();
			$selector.focus();
		} );
	},

	/**
	 * Convert Data attributes from the form and return a Javascript Object
	 * @method convertToObject
	 * @param {jQuery DOM element} $selector Basic from which the wizard will be created
	 * @returns {Object} Data used by the wizard for the experience
	 */
	convertToObject = function( $selector ) {
		var $form = $( "form", $selector ),
			$title = $( "h2", $selector ).first(),
			$intro = $( "p:not(" + selector + "-greetings):not(" + selector + "-farewell)", $form ).first(),
			btnClassName = "btn-former-send",
			datacook = {};

		datacook.header = ( typeof $selector.data( componentName ) !== undefined && $selector.data( componentName ) ? $selector.data( componentName ) : {} );

		datacook.header.inline = $selector.hasClass("wb-chtwzrd-inline");
		datacook.header.avatar = $selector.data( componentName + "-src" );

		datacook.header.defaultDestination = $form.attr( "action" );
		datacook.header.name = $form.attr( "name" );
		datacook.header.method = $form.attr( "method" );

		datacook.header.form = {};

		datacook.header.form.title = $title.html();
		datacook.header.title = replaceForWizard( $title, datacook.header.form.title );

		datacook.header.greetings = $( "p" + selector + "-greetings", $form ).html();
		datacook.header.farewell = $( "p" + selector + "-farewell", $form ).html();

		datacook.header.form.sendBtn = ( $( "input[type=submit]", $form ).length ? $( "input[type=submit]", $form ).addClass( btnClassName ).val() : $( "button[type=submit]", $form ).addClass( btnClassName ).html() );
		datacook.header.sendBtn = replaceForWizard( $( "." + btnClassName, $form ), datacook.header.form.sendBtn );

		if( $intro.length ) {
			datacook.header.form.instructions = $intro.html();
			datacook.header.instructions = replaceForWizard( $intro, datacook.header.form.instructions );
		}

		var $questions = $( "fieldset", $selector );
		datacook.questions = {};

		if( typeof datacook.header.first === "undefined" || !datacook.header.first ) {
			datacook.header.first = $questions.first().attr("id");
		}

		$questions.each( function() {
			var $label = $( "legend", $( this ) ),
				$choices = $( "label", $( this ) ),
				questionID = $( this ).attr( "id" ),
				qInput = ( $( "input[type=radio]", $( this ) ).length ? "radio" : "checkbox" ),
				choices = [],
				qName = "";

			$choices.each( function( index ) {
				var $choice = $( "input", $( this ) ),
					choice = {},
					name = $choice.attr( "name" ),
					action = $choice.data( componentName + "-url" ),
					textval = $choice.siblings( "span:not(.no-" + componentName + ")" ).html();

				if( !index ) {
					qName = name;
				}
				choice.content = textval;
				choice.value = $choice.val();
				choice.next = $choice.data( componentName + "-next" );
				if( typeof action !== undefined && action ) {
					choice.url = action;
				}
				choices.push( choice );
			} );
			datacook.questions[ questionID ] = {};
			datacook.questions[ questionID ].name = qName;
			datacook.questions[ questionID ].input = qInput;
			datacook.questions[ questionID ].formLabel = $label.html();
			datacook.questions[ questionID ].label = replaceForWizard( $label, datacook.questions[ questionID ].formLabel );
			datacook.questions[ questionID ].choices = choices;
		} );
		return datacook;
	},

	/**
	 * Build the chat wizard skeleton
	 * @method buildChtwzrd
	 * @param {jQuery DOM element} $selector Element to which the wizard will be appended
	 * @param {String} title The title of the wizard window, as well as the notification
	 */
	buildChtwzrd = function( $selector, title ) {
		$selector.after( '<div class="' + componentName + '-bubble-wrap"><a href="#' + componentName + '-container" aria-controls="' + componentName + '-container" class="' + componentName + '-link bubble trans-pulse" role="button">' + i18nDict.trigger + '</a><p class="trans-left"><span class="notif">' + title + '</span> <a href="#" class="notif-close" title="' + i18nDict.notification + '" aria-label="' + i18nDict.notification + '" role="button">×</a></p></div>' );
		$selector.next( selector + '-bubble-wrap' ).after( '<aside id="' + componentName + '-container" class="modal-content overlay-def ' + componentName + '-container ' + ( isInline ? ' wb-chtwzrd-contained' : '' ) + '"></aside>' );

		var $container = $( selector + "-container" );
		$container.append( '<header class="modal-header header"><h2 class="modal-title title">' + title + '</h2><button type="button" class="minimize" title="' + i18nDict.minimize + '"><span class="glyphicon glyphicon-chevron-down"></span></button></header>' );
		$container.append( '<form class="modal-body body" method="GET"></form>' );

		var $form = $( ".body", $container );
		$form.append( '<div class="conversation" tabindex="0"><section class="history" aria-live="assertive"><h3 class="wb-inv">' + i18nDict.conversation + '</h3></section><section class="reply"><h3 class="wb-inv">' + i18nDict.reply + '</h3><div class="inputs-zone"></div></section><div class="form-params"></div></div>' );
		$form.append( '<section class="controls"><h3 class="wb-inv">' + i18nDict.controls + '</h3><div class="row"><div class="col-xs-12"><button class="btn btn-primary btn-block btn-send" type="button">' + i18nDict.send + '</button></div></div><div class="row"><div class="col-xs-12 text-center mrgn-tp-sm"><a href="#' + componentName + '-basic" class="btn btn-sm btn-link basic-link" role="button">' + i18nDict.toggleBasic + '</a></div></div></section>' );
		
		$form.attr( "name", datainput.header.name + "-chat" );
		$form.attr( "method", datainput.header.method );
		sendBtn = $( ".btn-send ", $form ).html();
	},

	/**
	 * Build Basic Form from JSON
	 * @method buildBasicForm
	 * @param {jQuery DOM element} $selector Element to which the form will be appended
	 * @param {Object} data Data used by the form to build itself
	 */
	buildBasicForm = function( $selector, data ) {
		$selector.html( "" );

		var h2 = '<h2>' + data.header.title + '</h2>',
			intro = '<p>' + data.header.instructions + '</p>',
			btn = '>' + data.header.sendBtn + '</button>';

		if( typeof data.header.form.title !== undefined ) {
			h2 = '<h2 data-' + replacement + '="' + data.header.title + '">' + data.header.form.title + '</h2>';
		}
		$selector.append( h2 + '<form class="mrgn-bttm-xl" action="' + data.header.defaultDestination + '" name="' + data.header.name + '" method="' + ( data.header.method ? data.header.method : 'GET' ) + '"></form>' );

		var $basicForm = $( "form", $selector );

		if( typeof data.header.form.instructions !== undefined ) {
			intro = '<p data-' + replacement + '="' + data.header.instructions + '">' + data.header.form.instructions + '</p>';
		}
		$basicForm.append( '<p class="wb-chtwzrd-greetings wb-inv">' + data.header.greetings + '</p>' + intro );

		$.each( data.questions, function( key, value ) {
			var randID = "q" + new Date().valueOf() + Math.round(Math.random() * 100),
				legend = '<legend>' + value.label + '</legend>';

			if( typeof value.formLabel !== undefined && value.formLabel ) {
				legend = '<legend data-' + replacement + '="' + value.label + '">' + value.formLabel + '</legend>';
			}

			$basicForm.append( '<fieldset id="' + key + '" class="' + randID + '">' + legend + '<ul class="list-unstyled mrgn-tp-md"></ul></fieldset>' );

			var $thisQ = $( "." + randID, $basicForm );

			$.each( value.choices, function( index, ivalue ) {
				randID = "a" + new Date().valueOf() + Math.round(Math.random() * 100);
				$( "ul", $thisQ ).append( '<li><label><input type="' + value.input + '" value="' + ivalue.value + '" id ="' + randID + '" name="' + value.name + '" data-value="' + ivalue.content + '" /> <span>' + ivalue.content + '</span>' );
				$( "#" + randID, $thisQ ).attr( "data-" + componentName + "-next", ivalue.next );
				if( typeof ivalue.url !== undefined && ivalue.url ) { 
					$( "#" + randID, $thisQ ).attr( "data-" + componentName + "-url", ivalue.url );
				}
			} );
		} );

		if( typeof data.header.form.sendBtn !== undefined ) {
			btn = ' data-' + replacement + '="' + data.header.sendBtn + '">' + data.header.form.sendBtn + '</button>';
		}
		$basicForm.append( '<p class="wb-chtwzrd-farewell wb-inv">' + data.header.farewell + '</p><br/><button type="submit" class="btn btn-sm btn-primary"' + btn );

		if( typeof datainput.header.first === "undefined" || !datainput.header.first ) {
			datainput.header.first = $( "fieldset", $basicForm ).first().attr("id");
		}
	},

	/**
	 * Toggle between form and wizard
	 * @method toggleExperience
	 * @param {jQuery DOM element} $selector Element to which the experience will be active
	 * @param {String} toggle Give context to the toggle, wether it is form or wizard
	 */
	toggleExperience = function( $selector, toggle ) {
		// Redraw chat wizard and start over
		if( toggle == "wizard" ) {
			var $conversation = $( ".conversation", $selector );

			// Clear time outs in case they're still active
			window.clearTimeout( waitTimeout );
			window.clearTimeout( inputsTimeout );

			// Reset to default values
			waitingForAnswer = false;
			redirurl = datainput.header.defaultDestination;
			first = datainput.header.first;
			intro = ( datainput.header.instructions ? datainput.header.instructions : "" );
			current = datainput.questions[ first ];

			$( ".history, .form-params", $conversation ).html( "" );
			$( ".btn-send", $selector ).attr( "type", "button" ).html( sendBtn );
			$( ".history", $conversation ).attr( "aria-live", "assertive" );

			appendInteraction( $( ".body", $selector ) );
		} 
		// Redraw form if it's set to dynamic
		else {
			var $allQuestions = $( "fieldset", $selector );
			if( formType == "dynamic" ) {
				$allQuestions.not( ":first" ).hide();
				$( "input", $allQuestions ).prop( "checked", false );
			}
		}
	},

	/**
	 * Add new question from bot and add inputs accordingly
	 * @method appendInteraction
	 * @param {jQuery DOM element} $selector Element to which the question and choices will be appended
	 */
	appendInteraction = function( $selector ) {
		var $dropSpot = $( ".history", $selector ),
			$inputsSpot = $( ".inputs-zone", $selector ),
			$chtwzrdConvo = $( ".conversation", $selector ),
			$btnnext = $( ".btn-send", $selector ),
			markup = ( first != "" || intro != "" || current == "last" ? "p" : "h4" );

		waitingForAnswer = true;
		$btnnext.prop( "disabled", true );
		$inputsSpot.html( "" );
		$dropSpot.append( '<div class="row mrgn-bttm-md"><div class="col-xs-9"><' + markup + ' class="mrgn-tp-0 mrgn-bttm-0"><span class="avatar"></span><span class="question"></span></' + markup + '></div></div>' );

		var $lastQuestion = $( ".question:last", $dropSpot );

		// Faking delay and type time
		waitingBot( $lastQuestion );
		
		// Determine waiting time length
		var waitDelay = timeValues.longDelay;

		if( isInline && first != "" ) {
			waitDelay = timeValues.xLongDelay;
		} else if( first == "" && intro != "" ) {
			waitDelay = timeValues.xxLongDelay;
		}

		waitTimeout = setTimeout( function () {
			// Show greetings on first occurence
			if( first != "" ) {
				$lastQuestion.html( datainput.header.greetings );
				first = "";
				appendInteraction( $selector );
			} 
			// If intro is provided, show it before the first question
			else if( intro != "" ) { 
				$lastQuestion.html( intro );
				intro = "";
				appendInteraction( $selector );
			}
			// If it is the last question, then change the button to submit the form
			else if( current == "last" ) {
				$lastQuestion.html( datainput.header.farewell );
				$btnnext.attr( "type", "submit" ).prop( "disabled", false ).html( datainput.header.sendBtn + '&nbsp;<span class="glyphicon glyphicon-chevron-right small"></span>' );
				$selector.attr( "action", redirurl );
			} 
			// On every other occurences, append the question and its possible answers
			else {
				$lastQuestion.html( current.label );
				current.input = "radio";
				inputsTimeout = setTimeout( function () {
					$inputsSpot.append( '<fieldset><legend class="wb-inv">' + current.label + '</legend><div class="row"><div class="col-xs-12"><ul class="list-unstyled mrgn-tp-sm choices"></ul></div></div></fieldset>' );
					for( var i = 0; i < current.choices.length; i++ ) {
						var iQuestion = current.choices[ i ];	
						$( ".choices", $inputsSpot ).append( '<li><label><input type="' + current.input + '" value="' + iQuestion.value + '" name="' + current.name + '" data-' + componentName + '-next="' + iQuestion.next + '"' + ( typeof iQuestion.url === "undefined" ? '' : ' data-' + componentName + '-url="' + iQuestion.url + '"' ) + ( !i ? 'checked ' : '' ) + '/> <span>' + iQuestion.content + '</span></label></li>' );
					}
					$btnnext.prop( "disabled", false );

					// Reposition viewport to where the action is
					var tresholdHeight = $chtwzrdConvo[ 0 ].scrollHeight,
						$reply = $( ".reply", $selector );
					
					if( $reply.length && ( $reply.outerHeight() + $lastQuestion.outerHeight() > $chtwzrdConvo.innerHeight() ) ) {
						tresholdHeight = $dropSpot[ 0 ].scrollHeight - $lastQuestion.outerHeight() - 42;	// Minus "answer to life" for safety
					}
					$chtwzrdConvo.scrollTop( tresholdHeight );
				}, timeValues.mediumDelay );
			}
			$chtwzrdConvo.scrollTop( $chtwzrdConvo[ 0 ].scrollHeight );
		}, waitDelay );
	},

	/**
	 * Add reply from human and calls next question
	 * @method appendReply
	 * @param {jQuery DOM element} $selector Element to which the answer will be appended
	 * @param {Object} answerObj The answer selected and cooked
	 */
	appendReply = function( $selector, answerObj ) {
		var randID = "r" + new Date().valueOf() + Math.round(Math.random() * 100),
			$dropSpot = $( ".history", $selector );

		$dropSpot.append( '<div class="row mrgn-bttm-md"><div class="col-xs-9 col-xs-offset-3"><div class="message text-right pull-right" id="' + randID + '"><p class="mrgn-bttm-0"><span class="wb-inv">' + i18nDict.answer + ' </span>' + answerObj.value + '</p></div></div></div>' );
		
		// Append hidden input for information to carry over on submit
		$( ".form-params", $selector ).append( '<input type="hidden" name="' + answerObj.name + '" value="' + answerObj.val + '" data-value="' + answerObj.value + '" />' );
		
		waitingForAnswer = false;
		if( answerObj.url != "" ) {
			redirurl = answerObj.url; 
		}
		
		// Find next question
		var next = answerObj.qNext,
			$reply = $( "#" + randID, $dropSpot );

		if( next == "none" ) {
			current = "last";
		} else {
			current = datainput.questions[ next ];
		}
		$( ".btn-send", $selector ).prop( "disabled", true );
		$reply.attr( "tabindex", "0" );

		// Clear the inputs zone after an intuitive delay
		waitTimeout = setTimeout( function () {
			$( ".inputs-zone", $selector ).remove( "fieldset" );
			$reply.focus();
			$reply.removeAttr( "tabindex" );
			appendInteraction( $selector );
		}, timeValues.shortDelay );
	},

	/**
	 * Waiting for the bot to type animation
	 * @method waitingBot
	 * @param {jQuery DOM element} $selector Element to which the typing loader will be appended
	 */
	waitingBot = function( $selector ) {
		$selector.html( '<span class="loader-typing" aria-label="' + i18nDict.waiting + '"><span class="loader-dot dot1"></span><span class="loader-dot dot2"></span><span class="loader-dot dot3"></span></span>' );
	},

	/**
	 * Take the replacement as value if provided
	 * @method replaceForWizard
	 * @param {jQuery DOM element} $selector Element would potentially be replaced
	 * @param {String} formerValue Original value to replace
	 * @returns {String} Value that will be used, either replaced or not
	 */
	replaceForWizard = function( $selector, formerValue ) {
		// Data attribute for value replacement
		var r = $selector.data( replacement );

		return ( typeof r !== undefined && r ? r : formerValue );
	},

	/**
	 * Cooks an answer object that is suitable for all parties
	 * @method cookAnswerObj
	 * @param {jQuery DOM element} $selector Element to which the typing loader will be appended
	 * @returns {Object} A cooked answer
	 */
	cookAnswerObj = function( $selector ) {
		var next = $selector.data( componentName + "-next" );
		var url = $selector.data( componentName + "-url" );
		return {
			qNext: next, 
			name: $selector.attr( "name" ), 
			val: $selector.val(), 
			url: ( typeof url !== undefined && url ? url : "" ), 
			value: $selector.next().html()
		};
	};

// Initiator here, let's go!
if($(".wb-chtwzrd").length) {
	$chtwzrd = $(".wb-chtwzrd");
	fireChtwzrd($chtwzrd);
}