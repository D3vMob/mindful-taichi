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
    - [ ] add save to favorites button (need auth and user data in DB)
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
      - [ ] add button for Image
        - [ ] create image upload logic
      - [x] add button for Video YT
    - [ ] contact
    - [ ] schedule
    #Need to add auth tom complete these tasks below
  - [ ] create component for youtube playlist (favorites)
  - [ ] create component for admin page
  - [ ] create component for user settings page
- [x] create routing
- [x] connect to DB
- [ ] set Auth
- [ ] add admin methods (create users, create playlists, etc)
- [ ] style (colors and tuning by Jurgen)
- [ ] Toast Notification (on all CRUD operations)

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