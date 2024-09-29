# TO DO

- [x] initialize
- [x] setup deployment
- [x] create sections
  - [x] set up layout
    - [x] desktop
    - [x] mobile
  - [x] create component for header
  - [x] create component for navigation
  - [x] create component for youtube playlist (videos)
    - [x] add save to favorites button (need auth and user data in DB)
    - [x] manage fav in session storage and sync with DB
  - [x] create component for main page
    - [x] tiptap
      - [x] install tiptap
      - [x] install tiptap extension
      - [x] create tiptap component
      - [x] create safehtmlrender component
      - [x] create dialog component
        - [x] add save to DB button
        - [x] add cancel button
      - [x] create button component
      - [x] add save to DB
        - [x] create CRUD methods
        - [x] create post table
      - [x] add button component to create post
      - [x] add button component to delete post
      - [x] add button component to edit post
      - [x] create edit logic with slugs and IDs
      - [x] add button for Image
        - [x] create image upload logic
      - [x] add button for Video YT
    - [ ] contact
    - [ ] schedule
    #Need to add auth tom complete these tasks below
  - [x] create component for youtube playlist (favorites)
  - [ ] create component for user settings page
  - [ ] create component for admin page
- [x] create routing
- [x] connect to DB
- [x] set Auth
  - [x] setup firebase
  - [x] create login page
  - [x] manage Log IN or OUT button in header
  - [x] reset password
  - [x] protect routes
  - [x] import user data
  - [x] logged in user:
    - [x] display name in header
    - [x] display avatar in header
  - [x] add admin view limits
  - [ ] import user data (RIGHT BEFORE PRODUCTION!!!!)
- [ ] add admin methods (create users, create playlists, etc)
- [ ] style (colors and tuning by Jurgen)
- [ ] create animations
- [ ] Toast Notification (on all CRUD operations)
- [ ] Setup Staging Environment Vercel
- [ ] Setup Production Environment Vercel
  - [ ] Add SSL
  - [ ] Move Domain (DNS)

# TO TEST

- [ ] create test for CRUD methods
- [ ] create test for auth
  - [ ] create test for login
    - [ ] create test for reset password
    - [ ] create test for logout (make sure session is cleared)
  - [ ] create test for protected routes

# TO FIX

- [x] fix sticky header
- [ ] fix youtube playlist CASTING
- [x] fix HTML sanitizer to render HTML properly
- [x] fix TipTap 
  - [x] to render HTML properly on preview
  - [x] difference between create and update
  - [x] button double click issue
  - [x] some icon not rendering properly
  - [x] state keeps previous value after refresh
  - [ ] H1 and H2 not rendering properly
  - [ ] preview for text alignment not working
- [ ] fix breadcrumbs path for other pages
- [ ] fix navigation on focused section 
