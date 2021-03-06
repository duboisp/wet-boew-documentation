---
published: true
layout: default-theme-wet-boew-en
title: Meeting summary - WET-BOEW documentation
description: Summary of what has been discussed at the meeting.
modified: 2021-06-28
---

Summary of what has been discussed at the meeting.

## Roadmap

2021-06-23 (10 participants)
* Attendees separtment: PCO; TBS-DTO; ESDC-PP; ESDC; CRA; TBS; ESDC-CDTS
* Went through the recent change we made to wet-boew and gcweb
	* Releases
	* Méli-mélo feature
	* Thématique feature 
	* Added/New features
* Reviewed the project tracking lists
* Marking the following provisional feature deprecated for move as méli-mélo feature this autumn:
	* Background image heading
	* Light warning icon
	* Chat wizard
* CRA raised a multimedia player issue for YouTube video when used with the do-action plugin. Github issue: #9123
* Discussed about the provisional GC table and the idea of bring it as a core wet-boew feature.
* Responsible table for mobile view was discussed.
* Suggested by CRA to make gc-think-line the new baseline for the h1 underline

<details>
	<summary>Addtional notes</summary>
	
* Discussed on Product life cycle: Meli melo (~ alpha) > Provisional (~ beta) > Stable version.
* Attendees are invited to Code sprint to discuss new projects. - https://github.com/wet-boew/wet-boew/wiki/WET-BOEW-Code-sprint
* Suggested by Nick (TBS), to add a JS/CSS loader for Méli-mélo feature and GC Thématique feature
* Testing (including accessibility standards assessment) should be completed by the contributor for méli-mélo and thématique feature. 
* Peer review process was explained. 
* When GCWeb is updated, GCWeb Jekyll will be updated/rebuilt accordingly.
* David (TBS-DTO) is working on documenting GCWeb Jekyll according to it's API here: https://github.com/wet-boew/gcweb-jekyll/blob/master/api-publique.md 

</details>


2021-02-25 (6 participants)
* Reviewed the project list status
* Overview of the méli-mélo feature in development
	* Mentioned that accentuated character don't exist on all keyboard, suggestion to have a grunt task un-accentuated.
* Mention of creating a GCWeb Jekyll theme variant
* Chat box was renamed to Common chat experience

2021-01-13 (4 participants)
* Reviewed the project list status

2020-12-02 (6 participants)
* Reviewed the project list status
* The following Design decision was approved
	* DD-11 - Resize
	* DD-13 - Reduce aggressiveness of form validation plugin
* Discussion about DD-12 - Double h1
	* David E. want to add a paragraph about when to use this pattern and to only considerate it for special use case.
	* Pierre D. will add a reference ot the screen reader test that was run.
* DTO has updated the guidance on to not use the Carrousel. We would add it to the carrousel working example once we get the text.
* It was requested to re-word the Status column in the GCWeb Provisional features.
* The following provisional feature will become stable
	* bg-img
	* bg-cover
	* bg-img-srcset
	* randomize
	* postback
	* bg-center
	* bg-darker - Will be moved into wet-boew core
	* (GCWeb only) bg-gctheme
	* (GCWeb only) alert-*
	* (GCWeb only) gc-tickline

2020-09-10 (10 participants)
* Quick review of the list of projects.
* Presentation of Design Decision #13; WCAG references must be added.
	* Design Decision #12 was revisited and content must be added;
	* Design Decision #11 was revisited and content must be added.
* Review of provisional features.
* Round table:
	* Waiting on TBS for a formal request to force departments not to use the carousel;
	* Normalizing font sizes all accross (form, buttons, etc.) is becoming a priority for TBS.

2020-07-13 (8 participants)
* Quick review of the list of projects.
* Presentation of Design Decision #12; an formal example must be added.
	* Design Decision #11 was reviewed and content must be added.
* Review of provisional features:
	* ".bg-cover" will gradutate to stable;
	* "data-wb-randomize" will graduate to stable, but will need documentation;
	* ".bg-img-hdng" will be deprecated.
* Round table:
	* True dark theme was mentioned and is a very low priority;
	* It was asked to remove the carousel plugin, consequently:
		* It was suggested to add a blurb at the top of plugins or components that mentions "Under review";
		* It was recommended to add such blurb at the top of alerts.
	* There is a need to normalize font sizes all accross (form, buttons, etc.).

2020-06-10 (6 participants)
* Quick review of the list of projects.
* Presentation of Design Decision #11 about zooming for accessibility; a review was asked.
* First review of provisional features one-by-one; process to be reviewed.
	* ".bg-cover" (in conclusion to the exchange of arguments) and "data-wb-randomize" will gradutate to stable; ".bg-img-hdng" will be deprecated; the rest remains as-is.
		* It was mentioned that all spacing classes from Bootstrap 4 should be added.
		* CRA mentioned they are going to be using "data-bgimg"
* Briefly discussed about institutions' custom code approach, called "meli-melo"

2020-01-15 (6 participants)
* Review list of projects
* Approval of design decision #9 and #10
* Question was asked regarding floating images and floating content block vs meeting the accessibility.
* Mention that we are going to publish the accessibility report completed last summer.
* Briefly discuss of the improved service initiation pages (Child benefit) and the work that are going to be completed.

2019-12-18 (6 participants)
* Review list of projects
	* Will add new project for the integration of new design pattern in Canada.ca theme
		* New Service Initiation Template developped by CRA
		* New Institutional profile template developped by CRA
	* Going to open a new github issue on GCWeb to talk about multiple h1 on the same page.
* Presented the update to design decision #9
* Presented the design decision #10, which will obselete design decision #7

2019-10-23 (6 participants)
* Review list of projects
	* Added instruction on how to contribute at the accessiblity project
	* Add to calendar project has a new lead: Eric Guitar
* Approval of decision #7
* Approval of decision #8
* Presented decision #9 - Release early, release often (STR)
* Reviewed and approved to move all current bootstrap 4 gcweb experimental CSS into wet-beow stable

2019-09-20 (6 participants)
* Added Flat checkbox/radio button project for Canada.ca theme
* Approval of decision #6 on Versionning
* Postpone approval of decision #7 on Experimental feature
	* David E. from TBS want to discuss it with his peers before.
	* Want to avoid waste or ressource where TBS are looking to release testing environment called Alpha and Beta web site for Canada.ca theme.
* Presetation of Design Decision #8
	* Propose change id "#json-ld" for "#wb-script"
* Added the flat checkbox project
* Project completed
	* HTML table CSV
	* Accessibility - Assessment tool for WCAG 2.1 AA/AAA

2019-08- (1 participant)
Meeting was canceled

2019-07-24 (3 participants)

Update project status
Added Web Controls Library .NET project
Long documents project move as going stale
Annouced the idea of having "long term" releases.
Discussed about updating outdated Node packages.
Announced the creation of a Web Accessibility Working Group that will be assessing WCAG2.1 on the WET-BOEW.

2019-06-20 (4 participants)
* Update project status
* Added Web Controls Library .NET project
* Long documents project move as going stale
* Annouced the wet-boew v4.0.31 and gcweb 5.2 release are going to be this week.

2019-05-16 (5 participants)
* Update project status
* Discussed on a deployement strategy for JQuery 3 migration which we will provide some experimental stable build.
* Presented Design decision 6 on versionning
* Presented Design decision 7 on experimental feature
* WET Codefest 2019 event was put on hold/canceled but it will be reevaluated next August.

2019-04-24 (2 participants)
* Update project status
* New project initiated: "Add to calendar"
* Step forms project almost ready to submit PR
* New wet-boew project for .NET component - [wet-boew-dotnet-controls](https://github.com/wet-boew/wet-boew-dotnet-controls)

2019-03-21 (3 participants)
* Update projects status
* Re-activated project
	* Step forms
* Completed project
	* Geomap - Upgrade to open layer v3.x
* WET 4.0.31 and GCWeb 5.1.0 might be released in April instead of June. If those are released, in June WET 4.0.32 and GCWeb 5.2.0 will be the new planned release.
* Next meeting invite will be sent in the comming weeks.

2019-02-21 (6 participants)
* Update the status of all project
* New project
	* Chat wizard
	* Migration to jQuery 3
* Mentionned wet-boew v4.0.30 and gcweb v5.0 has been released
* Quick walktrough of the gcweb v5.0 release note and accompagning technical documentation
* Announced the Roadmap meeting would be held every 2 month now on.
* Next meeting invite are going to be sent out within the next two weeks

2019-01-17
Meeting canceled

2018-12-17 (4 participants )
* Briefly showed the last update that are applied to GCWeb and going to be applied to Canada.ca
* WET codefest organising commitee has initiated the planning work for the event. The date and location are not set yet.
* Re-iterated about the versionning number that GCWeb are going to use.

2018-11-15 - ( 6 participants )
* Briefly presented the new major changes that are applied to GCWeb. The list of all changes are published in the [GCWeb theme documentation](http://wet-boew.github.io/themes-dist/GCWeb/gcweb-theme/index.html) and [migration instruction](http://wet-boew.github.io/themes-dist/GCWeb/gcweb-theme/v2-migration.html) are available for implementer.
* For the version number attached with GCWeb release we have discussed the idea of changing how that is done. It was proposed to have a number that are going to reflect the actual changes made to the theme instead of being in the shadow of the release of wet-boew main project. For example the current redesign, name coded "gcweb v2", require major markup change and introduce a completed reviewed menu which would not be aligned anymore with the wet-boew menu plugin. It was suggested to simply rename the repository and then do the release with the revised version number. An issue on the gcweb github repository would be open to get the communauty feedback.
* In the light of deploying the new gcweb look in december, it was suggested to release WET 4.0.30 at the same time. It was noted that is planned in the current roadmap to release WET 4.0.30 for January 17. So, we might only do a "pre-release" of GCWeb in december and in January/February we might release it with the new version number, like v2.0.
* Brief review of all projects, there was no updates except the long documents project has made some progess.
* Codefest - Kick off meeting sent and scheduled for November 20
* We discussed the idea of having the second hours of the WET roadmap reserved to raise awarness on accessibility, openely discuss about web publishing best practice or a presentation how to use WET in a efficient way. A separate invitation would be sent. The target audience are going to be the same as it was for the "Center of Expertise" and web publisher interested in the presented topic. It was suggested the topic are going to be sent two weeks in advance. The idea was well received.

2018-10-18 - ( 5 participants )
* Review of all projects
* As discused at the last meeting, now there is a WET 5 summary page.
* Codefest - Kick off meeting for the planning commitee will be between October 29 - November 2
* Approval of Design Decision #5 - Migration strategy from WET 4 to WET 5
* Redesign of a few components in GCWeb are in progress
* Summarized a discussion that happened during wet-boew technical review about to use figure vs heading structure. Related to [GCWeb #1408](https://github.com/wet-boew/GCWeb/issues/1408) The tehcnical review group were no real preference from a technical stand point, both semantic was fine to list features. It was agree that was more a personal choice of the developer.

2018-09-27 - ( 5 participants )
* Review of all projects
* WET 4.0.29 was released
* Mentionned the upcomming WET code sprint would be structured and focused to deliver the new look of Canada.ca
* Presentation of Design Decision draft 2018-5 for the migration strategy of the WET 5 and WET 4 github content
* Announced that we are looking for participants to create a WET-BOEW Codefest 2018/2019 planning commitee.
* Summary of the presentation of WET 5 demo
	* [Presentation](/wet-boew-documentation/research/2018-11-wet5-augmented-design-presentation.html)
	* [Online demo](/wet-boew-documentation/research/2018-assets/2018-11-prototype/stacks/docs/index.html)
* WET 5 - [Key navigation demo](/wet-boew-documentation/research/2018-assets/2018-11-prototype/stacks/docs/nav-demo.html)
* Did a quick demo and overview of WET 5 alpha early prototype
* Discussed and some questions was asked about the current WET 5 approach as demo'ed by the prototype.
	* What would replace the basic HTML mode? Answer: There is no basic HTML mode possible with that design approach.
	* It is know in the communauty the purpose of WET framework is to help web publisher to meet easier the web accessibility guideline. It was noted that:
		* Having a such (WET 5) library, there is a high risk that web publisher could avoid to meet the accessibility requirement in order to meet internal goal, especially with short timeline. Answer: Need to be discussed.
		* More error prone to accessibility error for people with average/low web accessiblity skill. Answer: Need to be discussed.
		* May enforce each team to have their own accessiblity expert. Answer: Need to be discussed.
	* What is the advantage of WET 5 library compared to other library? Answer: Need to be discussed.
	* That library look like to solve a web content managment system (CMS) design issue [1] rather than helping the web publisher to meet web accessibility standard. Answer: Need to be discussed. [1] A CMS like where web publisher can't add any custom JS/CSS code.
	* By using that UI design approach, it may require department to hire more web accessiblity expert. Answer: Need to be discussed.
	* HTML snipped will be provided which it will be recognied to meet the accessibility guideline. But what if there is an update at that snipped? It looks like that may result with more maintenance work for the web publishing team. Answer: Need to be discussed.
* WET 5, as current, related question and discussion will be recorded and managed via a [dedicated research page](/wet-boew-documentation/research/2018-14-wet5-summary.html).

2018-08-24 ( 11 participants )
* Review of all the projects
* It was noted the plugin "Country content" is now broken because of the API freegeoip has recently changed.
	* Related to issue: https://github.com/wet-boew/wet-boew/issues/8365
* Announced that WET 4.0.29 will be released in the following weeks
* The WET 5 presentation was reported to the following week. Details for WET 5 will be published here.

2018-07-26 ( 10 participants )
* Review of all the projects
* Presented an early draft of the first test suites we would have in WET.
	* Heading inside ```<summary>``` element
		* [Temporary live example](https://duboisp.github.io/wet-boew-documentation/assessment/2018-1.html)
		* [Source code](https://github.com/juleskuehn/wet-boew-documentation/tree/detailSummary)
* Presented the new [GCWeb home page](http://wet-boew.github.io/themes-dist/GCWeb/index-en.html)
	* More aligned with the Content and IA spec structure
	* Status label to show the current conformance and backlog items
	* Would be possible to have a detailled history and analysis done for each template. Like the [index pages](http://wet-boew.github.io/themes-dist/GCWeb/index/index.html).
	* Can include departemental specific template. Like [ESDC campaing template](http://wet-boew.github.io/themes-dist/GCWeb/campaign2-en.html)
* WET 5
	* Briefly walked through the work done for the prototype
	* Next WET Roadmap meeting, it will be a presentation of a "functional" WET 5 prototype which should be available to initiate some testing.
	* Will focus on a Data first design approach.
* Test suite and potential future design decision (Best practice)
	* Test suites for heading inside ```<summary>``` element once completed may result by drafting a new Design decision
	* Some work will be intiated to draft a best practice to avoid to use ```placeholder``` attribute. Once the test suites created, tested and the design decision drafted/approved then any CSS customization for the placeholder attribute and related issue about a non-conforming color contrast issue might be close. It's behaviour would be fully delegated to how Browser vendor implement that feature and we will promote and update our working example to not use the ```placeholder``` attribute.

2018-06-20 ( 6 participants )
* Desing decision approved:
	* Design decision 4: Basic HTML mode and progressive enhancement
* Review list of projects and added a few inactive known projects in order to expose them better.

2018-05-17 ( 6 participants )
* Design decision:
	* Design decision 3: WET API/Blueprint
		*  Approved
	* 2018-4: Basic HTML and progressive enhancement
		* Waiting for more feedback, see [#8357](https://github.com/wet-boew/wet-boew/issues/8357)

2018-04-19 ( 9 participants )
* Design decision approved:
	* Design decision 1: Use SVG with img element instead of object
	* Design decision 2: Browser supported
* Design proposal :
	* 2018-4: Basic HTML and progressive enhancement
	* 2018-5: WET API/Blueprint
* UX research :
	* Filtering interface with performance meter

2018-03-14 ( 9 participants )
* Re-introduce and walk through the new [wet-boew documentation](https://wet-boew.github.io/wet-boew-documentation/index-en.html) website.
* We openly discussed about the current projects like the design system and the accessiblity project.
* Introduced and general discussion about what each section means and their purpose.
* We have talk, high level discussion, about what are the requirement for next version of WET. Like the need to better support web apps, be more modular, be less opiniated, have an easy way to setup dev environment (build)
* Collected a list of interested member to be part of a WB5 committee/group/task force.
* WB5 commitee will report to roadmap and wb5 discussion would be aside the roadmap meeting

2018-02-23 ( 2 participants )
* Introduce and walk through the new [wet-boew documentation](https://wet-boew.github.io/wet-boew-documentation/index-en.html) website.
* Improvement for the wet-boew documentation are welcome, submit your suggestion through a github issue or a PR.

## Technical review

Technical review meeting are out of scope by default unless there is a project interest.

2018-04-11 ( 4 paticipants )
* WET feature API/Blueprint
	* It should include the translation string
* i18n (brainstorming)
	* French and English are the official supported language.
	* Use of other language that is not officially supported would be the responsibility of the person/organisation that require to use it. Our i18n design approach would need to continue to support the possibility of having multiple/infinity language. A notice explaining that approach would be included near the i18n information.
2018-04-05 ( 4 participants )
* Talk about what browser is supported for current release of WET
	* 5% and more from [statistic](http://wet-boew.github.io/wet-boew-documentation/research/2018-2-browser-usage.html)
	* Latest and previous released version of major desktop and mobile browser
	* FF, [FF ESR](https://www.mozilla.org/en-US/firefox/organizations/), Chrome, IE11, Edge, Safari, Chrome mobile, Safari mobile
	* Running on Windows 7, Windows 10, android, iOS, MacOS
	* Update the prefix CSS tool [wet-boew issues #8339](https://github.com/wet-boew/wet-boew/issues/8339)
	* Update the browser list for saucelab testing [browser.json](https://github.com/wet-boew/wet-boew/blob/master/browsers.json)
* [wet-boew issue #7631](https://github.com/wet-boew/wet-boew/issues/7631) - Moving the italic issue forward, the next step are:
	* Create a page that summarize the issue, the real concern and the suggested fixes.
	* Poke the communauty and the appropriate web standards office
	* Define a usability testing plan and create test cases of the issue and the suggested fixes.
	* Goal: obtain enough data to create a design decision
	* At the end, a design desion will be released with
* Suggested to use documentation badge like : [https://inch-ci.org/learn_more](https://inch-ci.org/learn_more)
* Suggested to review how we use SauceLabs (it was timing out) and re-activate it
* Try to move forward the Issue template - [wet-boew issues 8316](https://github.com/wet-boew/wet-boew/issues/8316)
* Nick will look at how we can implement AMD for wet feature.

2018-02-28 ( 6 participants )
* Member as been requested to send their priority issue they want to move forward
* Identify for the next meeting Github wet-boew repository that have a low/no activity and close their issue tracker.
	* This is to ease maintenance as new issue or updated issue wont be look at.
	* Issue about those repository would be reported to the wet-boew main project
	* Suggestion on those closed repository:
		* Mention in the repo description that issue can be submited in the wet-boew main project
		* Modify the readme and explain how to submit a issue through the wet-boew main project.
* Suggestions: Create a issue.md template file to provide more guidance for when submiting new issue on Github
	* Eric D. would look to submit a PR

## Special meeting

### WET 5 initial prototype - August 31

[Documenation material presented](../research/2018-11-wet5-augmented-design-presentation.html)

16 participant (8 in person and 8 in teleconference)

Summary
* Presentation of the context of WET 5
* Demonstration of the WET 5 alpha prototype by Mario B.
	* Show what the end user will see
	* Show how interaction pattern are implemented directly in the HTML in-page markup
	* Explained that no build script is required to develop, it use Require.js for dependency loading
	* Explained there is no component, all the logic via a "gear" are configured in the HTML markup
	* Explained the WET 5 loader, which leverage the CSS 3 animation event in order to be trigger.
	* WET 5 web page only support one mode, the standard mode.
	* Explained how a "gear" (a javascript module compatible with the new WET5 architecture) are working
	* Created a new "gear" and it was ready to use upon its creation.
	* Show an enhancer hidden in WET 5 where it highlights area in the web page that are more prone to accessibility error.

Prototype available here: [https://github.com/wet-boew/wet-boew-experimental/tree/release5.0-alpha](https://github.com/wet-boew/wet-boew-experimental/tree/release5.0-alpha)

To setup the prototype you need:
* Download the files and extract it in a Apache HTTP Server. Apache HTTP Server is required to apply the server side include.
* Ensure the HTTP server support the URL rewrite
	* If it don't support Apache Server will return you an error. In that situation, open up the .htaccess file located in "stacks/src" and remove the line that do the URL rewrite.
* The working example is located at: stacks/docs/index.html
* The Javascript file is located at: stacks/src

### WET 5 Kickoff - May 10

[Documentation material presented](../research/2018-3-wet5-kickoff.html)

15 participant (8 in person and 7 in teleconference)

Summary
* The high level concept for WET 5 core was well received.
* It was suggested to switch over ES6 and use thrid party service such Babel to run ES6 on browser that don't support it
* Some concern was express in regards of what the build system could be to support the WET 5 product.
* It was recommended to documents and do more research about the needs from the user of WET.
* Next WET 5 meeting would be more topic specific, like focusing on the core, the build, testing, etc.
* The overall project monitoring will be done through the WET Roadmap meeting.

List of todo:
* Reach out and try to being active on social media.
* Create a page with of thing that need to be addressed and/or taken care of.
* Build small prototype and have it tested with different audience (web developer, web author, WET core developer)
* Produce a documentation that could be easilly aligned with the TBS Digital Standard
* Find contributor across the spectrum and seek their feedback on the product.
* Develop a plan and a strategy to address concern between moving from WET 4 to WET 5.
* Develop a plan and a strategy to address some WET user fears, like removing the jQuery library from WET core.

Suggestion/Idea
* Use a top bar overlay to advertise the user that he are in the Basic HTML mode
* Having two build system, one for quick local developpement and the full build that may require nodeJS. Some opposition was expressed about having two different type of build.
* Support and promote mobile first design
* Create a business plan about the markup for WET 5, use focus group and explore if it makes senses
* Consider a way to have organisation to lead some WET plugin.

