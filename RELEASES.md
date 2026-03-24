## Release change log

## 2.14.1 - 24 Mar 2026

### Photo & Frame Effects Drawer

- Feat: Consolidate FrameItem toolbar into a new Photo & Frame Effects drawer with icons and left-aligned layout
- Feat: Add Photo & Frame Effects drawer to ImageItem, replacing Enhance, Bg Remover and Border buttons in action bar
- Feat: Wire frame transparency slider to Redux with undo support and apply opacity to rendered frame
- Feat: Add MagicWand icon for Enhance Photo button
- Fix: Dismiss drawer when selecting a different content item in a frame

### Generic Card Product Types

- Feat: Generic Card Product canvas sizes — bifold/double-sided pagination, dimension-based rendering, and Storybook support
- Feat: Show generic card product types in Create Case "Available Tributes" checkboxes
- Feat: Filter generic card product types by user role and availability (admin/client/direct user)
- Feat: Add availability column and tri-state checkboxes to Generic Card Product Types admin pages
- Feat: Centralise generic card product types fetching into `useAllGenericCardProductTypes` hook

### Product Availability Cascading Lookup

- Feat: Replace slow bulk case updates with read-time cascading resolution (Case > Client > Global) when changing client product settings
- Fix: Refine cascading logic to exclude global defaults when client/case products exist

### API & External Integrations

- Feat: Create Case API — add optional fields and new update case endpoint (`/v2/external/cases/:caseId`)
- Feat: Add partial email search to Admin Quick Search
- Fix: Store date of birth, date of death and service date as `YYYY-MM-DD` in the backend

### Bug Fixes

- Fix: Photos not staying in their frames
- Fix: "Add to Order" button disabled when design is not approved
- Fix: Checkout — photobook availability and order for displayed packages
- Fix: Resolve undefined `pageContentWidth` when adding image row
- Fix: Allow today's date accurately in date picker
- Fix: Remove required email field restriction in Create Case modal
- Fix: Accept number type for `service.timeStartDisplay` and `deceased.primaryImage.width/height` in case schema
- Fix: Slideshow background image scale increased from 0.8 to 0.9

### Chore

- Chore: Remove debug console.log statements
- Chore: Clean up generic card product feature flags
- Chore: Remove unused icon exports and refactor ActionBar components

## 2.14.0 - 11 Feb 2026

- Feat: Migrate secrets to AWS SSM across API, Client, and Generator packages
- Feat: Slideshow Generation - Use timestamped S3 folders (`generationId`) to avoid file conflicts
- Feat: Photobook - Default "FH can order" checkbox checked
- Fix: Face detection coordinate scaling and dual-axis centering
- Fix: Border rendering when overlay with fade is applied on same page
- Fix: S3Helper missing import and daily cleanup for `gen-{timestamp}` folders
- Fix: Local API launch with missing environment variables
- Fix: Hide the `Keep Editing` button when the photobook has been purchased

## 2.13.3 - 3 Feb 2026

- Fix: Thank You card theme switching between 1-column and 2-column layouts
- Fix: Image glitch prevention moved to asset upload with PNG output format
- Fix: Share invitations only sent to selected recipients with correct invitor name
- Fix: Prevent duplicate notifications and asset fetch requests
- Fix: Case update race conditions and customerId undefined issue
- Fix: ReindexRedisDB memory exhaustion with paginated DynamoDB scanning
- Fix: Export report Lambda timeout optimization
- Fix: Photobook Service Cards alignment on Home page
- Fix: FAQ URL updated to eulogizememorials.com
- Feat: Hide Photobook for AU & CAN users in dashboard and checkout flows
- Feat: Redis connection resilience with auto-reconnection mechanism
- Enhance: Disable "Use shipping as billing address" checkbox by default
- Enhance: Restore dynamic checkout package order based on entry product
- Security: Remove hardcoded API keys, use environment variables
- Security: Dependency upgrades - Stripe 20.2.0, SendGrid 8.0.0, Gatsby 5.15.0, Puppeteer 22.13.1, and others
- Chore: Remove Sydney production related code

## 2.13.2 - 13 Jan 2025

- Feat: Lazy face detection for first 20 visible images in ImageLibrary and UploadPicturesPanel
- Feat: Add loading spinner and 'Positioning' message during face detection process
- Feat: Slideshow - Add unused images counter and filtering functionality
- Feat: Share Flow - Add rich text support for invitation messages on download page
- Feat: Share Flow - Display conditional messaging when tributes are reopened for editing
- Fix: Limit face detection auto-trigger to Card Product editors only
- Fix: Generator - Add concurrency limits to prevent file descriptor exhaustion when processing large frame sets
- Fix: Image orientation issue with Filestack store image function
- Fix: FSPickerImageOverlay - Only redirect to Photo Library when on /admin/dashboard page
- Fix: Download Page - Fix blank page on Booklet preview while maintaining load performance
- Fix: Slideshow - Optimize drag responsiveness with dynamic pressDelay
- Fix: Booklet - Restrict primary image edit option to first content item only
- Fix: Share Flow - Populate creator details and display invitor name correctly
- Enhance: Hide has-to-pay editor and normal editor options in invite modal
- Enhance: Restrict connections menu visibility to admin users only
- Perf: Setup gatsby-plugin-remove-console to remove console.logs in production

## 2.13.1 - 17 Nov 2025

- Websocket - Connections table and model setup
- Websocket - product data update message handling

## 2.13.0 - 21 Oct 2025

- Enable Photobook to customers and client admin users
- New Booklet Live Preview

## 2.12.16 - 2 Oct 2025

- Fix: fix Brainfish and Freshchat integration
- Update Photobook Drawer layouts and content
- Enhance Video Regeneration performance

## 2.12.15 - 24 Sep 2025

- Fix: Generated PDF not matching Preview - Faded Image misalign on PDF
- Fix: Broken Magic Link in New User Welcome Emails
- Fix: Download Magic Link not working and also endpoint was removed
- Enhance: improve Booklet Editor user experience

## 2.12.14 - 22 Aug 2025

- Fix: Face Detection - only centering either X or Y without zooming in
- Fix: Blank page when closing Share Modal in Funeral Director Dashboard
- Fix: Complete status not updating after tribute is generated

## 2.12.13 - 19 Aug 2025

- Perf: indexing assets to improve performance on the home page
- Feat: Face Detection and centering photo for primary image on tribute editors

## 2.12.12 - 6 Aug 2025

- Increase number of concurrent lambda instances to 50 for api
- Stripe upgrade

## 2.12.11 - 21 Jul 2025

- Fix Booklet Bleed version with ghostscript
- Enhance image library, slideshow, tributes images preloading on both editor and preview
- Generator - move database record file status upload process to the PDF generator process

## 2.12.10 - 25 Jun 2025

- Fix: Image Frame Resizing in 2-Column Template on TV Welcome Screen
- Feat: add font sizes 11,13,15,19 to text editors
- Feat: Cache all tributes, invites and cases in Redis

## 2.12.9 - 18 Jun 2025

- Photo Fade effect - leaving/entering after editing should show an alert
- Redis Caching - Theme creation/update/deletion - should update the redis cache

## 2.12.8 - 16 Jun 2025

- Feat: Booklet Faded Edges Frame
- Fix - Frame progressively increasing size when changing frame
- Enable Photobook Preview
- Enhance Resize Frame image photo experience - no flickering

## 2.12.7 - 27 May 2025

- API - Fix Case Report region field

## 2.12.6 - 26 May 2025

- API - Consolidate old api endpoints into /v2/old endpoints
- API - warm up lambda instances for /v2/ endpoints

## 2.12.5 - 16 May 2025

- Booklet Editor - Date Display field - fix invalid date on data pulling
- Video Generation - add retry mechanism when images cannot be downloaded from S3
- Photo Library - UI Refacotoring
- Checkout Flow - Bug fixing and supports client and editor to purchase keepsakes
- Serverless v3 to v4, and API bundled with ESBuild instead of webpack
- Bugsnag Setup

## 2.12.4 - 16 Apr 2025

- Slideshow - Generation - fix the size of the image to match the size in the preview

## 2.12.3 - 31 Mar 2025

- Performance - introduce Redis cache to themes endpoint
- Performance - Dashboard - consolidate find endpoints to a single resource endpoint /v2/admin/cases/:caseId/resources
- Performance - Booklet Editor - changing image update the store and the editor instantly

## 2.12.2 - 28 Mar 2025

- Fix: Printing Fee is missing when selected shipping method is free

## 2.12.1 - 26 Mar 2025

- Fix: Missing delivery option for printing & delivery package
- Fix: Click "Start Creating" should open the correct theme drawer based on the product

## 2.12.0 - 26 Mar 2025

- Feat: Checkout - Printing & Delivery
- Fix: Remove timeline header for small screens

## 2.11.8 - 21 Mar 2025

- Fix: Slideshow Editor - not able to drop image to the end of the timeline
- Fix: QR code for mobile uploading is not centered
- Feat: add Retain Case flag
- Fix: Booklet preview does not match editor or download

## 2.11.7 - 7 Mar 2025

- Fix: Footer Home page link and Privacy links

## 2.11.6 - 6 Mar 2025

- Fix: Get an error when attempting to save it as a theme
- Fix: on the booklet preview, if you run the mouse over the corner the whole modal seems to shake

## 2.11.5 - 5 Mar 2025

- BrainFish integration
- Pendo integration

## 2.11.4 - 4 Mar 2025

- Fix: Coeditor Users should not be able to download tributes from home page after client generates
- Fix: Booklet preview does not match editor or download

## 2.11.3 - 1 Mar 2025

- Fix: Cloudfront invalidation path for Case report

## 2.11.2 - 27 Feb 2025

- Fix: Jumping Image on resizing
- Fix: Font family typo - updating from `Old Stantard TT` to `Old Standard TT`

## 2.11.1 - 24 Feb 2025

- Fix: Client Handle - User Sign up - Notification for user
- Fix: Text quality of TV welcome screen is much lower quality in video than in jpeg download
- Fix: Quick Search - No Of images and No of invites values should reflect in the Setting drawer
- Fix: Checkout Flow Bugs
- Feat: New Download Page Layout
- Feat: B2B Case Creation API - 1.19.0

## 2.11.0 - 5 Feb 2025

- Fix: Font size - the size of the box gets biggers but the font does not change in booklet editor when updating fonts for a second or third time
- Client Handle - add clientLogoUrl variable to the email template
- Client Handle - user sign up notification - add SENDGRID_TEMPLATE_RESOURCE_CLIENT_USER_CASE_CREATED to all environments
- Case Creation B2B API: API 1.19 release, Gist markdown file published
- Checkout Flow: Disable discount sale feature
- Generator: Generator reduce package size - react icons - extract bi library from react-icons
- Generator: Generator reduce package size - react icons - exclude @AWS-SDK packages from generator bundle

## 2.10.2 - 29 Jan 2025

- CSV Report - split date column into date and time columns for service date, created and payment

## 2.10.0 - 23 Jan 2025

- Enhancement - Improve Case Search performance - Case Report Table
- Feat: Checkout Pages

## 2.9.2 - 21 Jan 2025

- Fix Quick Search - populate the search result with the correct data

## 2.9.1 - 17 Jan 2025

- Fix - Admin Case Search - fix recent search and break down search 50 cases in a block

## 2.9.0 - 17 Jan 2025

- Fix - Embedded Booklet and Slideshow - Mobile view
- Admin Quick Search
- Admin Case - add Client column
- Client Handle - QR Code

## 2.8.2 - 19 Dec 2024

- Fix: Embedded page - remove help chatbot
- Fix: Embedded Code - When a user clicks copy on the embedded link, show loading animation then a notification to say copied

## 2.8.1 - 19 Dec 2024

- Fix: support tiff image format
- Fix: Booklet Preview - ensure preview is center on the front/back page

## 2.8.0 - 18 Dec 2024

- Feat: Embedded Booklet for third party websites
- Feat: Flip Book animation for Booklet preview

## 2.7.7 - 13 Dec 2024

- Fix: Divider not appearing on generated pdf

## 2.7.6 - 2 Dec 2024

- Feat: Embedded slideshow video for third party websites
- Fix: hide Account Settings for Client users when they are on the dashboard

## 2.7.5 - 26 Nov 2024

- Fix: Continue button turns infinitely loading state if signing up is failed
- Feat: Add 10 as max invite limit in contributor invite modal

## 2.7.4 - 25 Nov 2024

- Integrate with WebPurify profanity checking API
- Slideshow Video Bier - Backend api
- blocked certain emails from being invited to collaborate

## 2.7.3 - 20 Nov 2024

- Separate Export Report to a separate lambda process

## 2.7.2 - 19 Nov 2024

- External API - case creation - 1.17

## 2.7.1 - 19 Nov 2024

- Booklet - Icon Feature

## 2.7.0 - 18 Nov 2024

- Overlay Settings - opacity, fade and end color controls
- Borders - update color picker
- Booklet - Divider - add color picker and updated to svg

## 2.6.4 - 1 Nov 2024

- Fix - warmed modal - increase the modal width to 90vw
- Fix - photo library - enhance image - slideshow update
- Update/timeline thumbnail button reorder + image drawer button reorder

## 2.6.3 - 26 Oct 2024

- User - make sure the user password will not be removed on user update

## 2.6.2 - 21 Oct 2024

- Generator - S3 bucket clean up use prepareS3 function to clean up bucket properly
- Slideshow - Fix duplicate email on slideshow generation
- Audio - Fix audio file path issue for Lilac.mp3

## 2.6.1 - 18 Oct 2024

- Generator - not clean up frames and video blocks before generating
- Slideshow - reflection - if getImage is next (e.g. reflection theme), it should not show the slide background image

## 2.6.0 - 17 Oct 2024

- Slideshow Generator - split the video block generation process into multiple lambda functions
- Background Image - Edit Background Image
- Booklet - Graphic Frames

## 2.5.1 - 17 Sep 2024

- QR Code Eulogize purple logo replacement
- Reedited tribute can still see the download/download(bleed) buttons at the top
- Payment API fix - Missing Sku
- Temporarily hide new help guide as feedback are given and it needs to be updated

## 2.5.0 - 16 Sep 2024

- Global Color update - blue to purple
- Lambda Payload - Gzipped the payload to reduce the size
- Replace React Context with React Redux and Saga
- New Help Guide in dashboard, booklet and timeline

## 2.4.5 - 16 Aug 2024

- Fix - Booklet Editor - Misalignment on the Frame Images

## 2.4.4 - 13 Aug 2024

- Fix - Slideshow Preview - video stop playing after the first audio finish

## 2.4.3 - 12 Aug 2024

- Feat - Primary Image - If the product status is ThemeSelected and primary image has changed, the new primary image should apply when users entering the Product Editor page
- Fix - Booklet Editor - clicking to change the frame style of an image and nothing happens
- Fix - Booklet Editor - Frame - Not able to select frame item inside multiple images frame
- Fix - Slideshow Generator - clean up s3 folder after video generation

## 2.4.2 - 8 Aug 2024

- Fix - overlay not working on the back page of the bookmark
- Fix - not able to select frame image inside multiple image frame

## 2.4.1 - 8 Aug 2024

- Fix - Booklet Editor - Clicking on Space Item not focusing on the item
- Fix - Booklet Editor - when clicking into black space in booklet editor. It does not seem to de-select the asset.
- Fix - Booklet Editor - Cant select assets on booklet pages by clicking the handles on the sides of the page, you have to click the assets
- Feat - Client Handle - Able to generate a link to a sign up page that is linked to a client account

## 2.4.0 - 29 Jul 2024

- Feat - Ability for clients to hide tributes to their users
- Fix - Refactored Generator to use AudioHelper instead of the GeneratorMediaHelper for Audio url for UI and backend consistency
- Feat - Move max length video warning to the audio modal
- Fix - Generator - Generating videos in batches and merge all video at the end
- Feat - Update the output image format to JPEG
- Feat - Editing an image via Filestack Transformation UI will be replacing the old image automatically
- Feat - Image loaders are added while the edited image is being uploaded

## 2.3.11 - 2 Jul 2024

- Fix - find endpoint increase memory size
- Fix - save endpoint increase ephemeral storage from 512mb to 1gb
- Feat - do not allow users to create longer than 45 minutes slideshow videos
- Feat - Sign up page reskin
- Feat - Add Lambda Insight for important API resource save/find and generator lambdas

## 2.3.10 - 26 Jun 2024

- Fix - Tv Welcome screen - Pink Pastel - overlapping text boxes and Fall Flowers - Circle is not a Circle
- Fix - bookmark - Wrong photo assets in bookmark themes
- Feat - No Audio Modal - Info message
- Feat - Turn off the "Very slow slides" warning for No Audio Mode
- Feat - Add an overlay when hovering the uploaded image in the image library of the card editor page

## 2.3.9 - 25 Jun 2024

- Fix - No Audio Mode - Changing total video length duration
- Fix - Users can not type in the address selection dropdown
- Fix - Service date is not pulling through in account settings page
- Fix - Remove Eulogise Logo in the prefill data form
- Fix - Clicking complete from inside a tribute should allow tribute to be generated
- Fix - Dynamic data - primary image is not pulling through from Booklet
- Fix - Filtering in Dashboard - most recently created cases should come to top by default

## 2.3.8 - 21 Jun 2024

- Bugs - Overlay display on the wrong page in the generated pdf

## 2.3.7 - 20 Jun 2024

- Bugs - Rewritten Overlay for Card Products

## 2.3.6 - 19 Jun 2024

- Fix - update API Generator URL to eulogisememorials.com

## 2.3.5 - 17 Jun 2024

- Fix: TV Welcome Screen Data Pollution
- Fix - Preview button should be disabled if no images are in timeline
- Feat: Client Admin - Show Generating and disabled going into the editor if the case is generating

## 2.3.4 - 13 Jun 2024

- Fix: Generator - Split out Video Generation process from Slideshow Generation process to extend the timeout to 30 minutes
- Feat: Add "Copy Link" to Invite Collaborator/CoEditor modal

## 2.3.3 - 12 Jun 2024

- Fix: Temporarily hide the feature of prefilled address selection in case creation form for addresses.
- Fix: Unable to create a new client issue if no address input.
- Fix: Slideshow header buttons misaligned issue.

## 2.3.2 - 7 Jun 2024

- Feat: Add unsaved confirmation when redirecting to photo library or background upload pages, if users have any unsaved editing products
- Feat: Add a successful notification when images are uploaded
- Fix: Generator - Memorial card bleed - background is not using the bleed image
- Fix: Slideshow Not generating - caused by some format of an audio file
- Fix: Bookmark Editor - background does not apply to the back page

## 2.3.1 - 6 Jun 2024

- Fix: Generator - Slideshow Video generation with edited audio
- Feat: Add a share button in timeline
- Fix: Audio track mode should be automatically changed to no audio mode if no track is selected when closing the music setting modal

## 2.3.0 - 4 Jun 2024

- Feature: Upload Background Images

## 2.2.8 - 22 May 2024

- Fix: Generator - move all google fonts to AWS Layer and get fonts from the layer instead of google fonts

## 2.2.7 - 6 May 2024

- Fix: production issue - preview goes white if no audio slideshow's duration is longer than 32 mins - added 1 hours slience clip

## 2.2.6 - 6 May 2024

- Fix: production issues fixing - added pages overlapped each others

## 2.2.5 - 2 May 2024

- Feat: create new user permission level `Editor`
- Fix: TV welcome screen bug fixing
- Feat: add dynamic client logo in invitation emails
- Feat: cases originated with a client that has logo should be able to see the logo in the header
- Fix: production issues fixing - code build update to node 18 and reduce generator's timeout to 20 seconds
- Feat: photo library unsaved confirm modal
- Feat: admin account - new field client email asset
- Fix: production issues fixing - db clearn up solution optimisation

## 2.2.4 - 25 Apr 2024

- Fix: Generator - add retry mechanism (max retries 3 times) if generate screenshot failed

## 2.2.3 - 24 Apr 2024

- Fix: TV Welcome Screen - generation by adding Promise race

## 2.2.2 - 24 Apr 2024

- Fix: Generator not generating pdf and videos

## 2.2.1 - 23 Apr 2024

- Fix: the spacer at top of tv welcome screen shows under the image

## 2.2.0 - 22 Apr 2024

- Feat: Dynamic data pulling - adding long name dynamic auto-resizing triggers
- Feat: Hide noreply emails
- Fix: Save Theme - make sure the text color is applying for the whole block so we won't have multiple text color for theme
- Feat: Photo Library - Remove shadow token one-time refresh mechanism
- Feat: Photo Library - Replace old image library with the new photo library
- Fix: Photo Library - Mobile image upload - QR code bug fixing
