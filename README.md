# Artist_Rally
A stamp rally map for Artist Alleys

# Tech Stack
Basic HTML, CSS, JS

# How to Run
1. Pull Repo from Github
2. In VSCode download Live Server Extension (By Ritwick Dey)
3. Right Click index.html file and select "Open with Live Server"

# Vision
- Users by default are on a guest account, no sign in required
- Users only sign in if they want to favourite and mark off Stamp rallies
- Users only need a username and 4 digit pin to create an acc to sign in. This 
account is temporary and deleted once a convention is over 

- Users can create stamp rallies. The user who creates it becomes the Host of the rally
- Hosts have the power to add and remove artists from an alley, as well as write and edit rally descriptions 
- Hosts can Share a link or a Code with fellow artists to add them in (Max 30 artist limit per stamp rally)
- Hosts can also generate a seperate sharing link to provide to stamp rally participants. 
    Note:(This link should never change once generated, in case the Host has already created physical cards)

- Once an artist is invited to a rally - they can put a marker on the map indicating their stall Number. They can also enter in information such as their socials or catalogue or just a general greeting. 
- Each artist must create a account so that they can edit anything in case of change
- This marker then becomes visible to those interested in the stamp rally

# File explaination
1. index.html => the first page which lets you select which convention you are attending
    - index.js so far is only used for redirection to convention_map.html
    - index.css is the styling for index.html to make it look ✨ prettier ✨
2. convention_map.html => the convention map and rally viewer
    - convention_map.css is the styling for index.html 
    - convention_map_pan_zoom.js is a script used by convention_map.html to control map panning 
    and zooming 
        - currently only zooming works but not panning. This needs to be fixed
        - (code taken from nurbs 3000 https://github.com/nurbs3000/may2025/blob/main/panZoomImage.html)
    - convention-map-rally.js is another script used by convention_map.html used to display individual rally associated data.
3. Other folders
    - Data Folder : Contains Dummy Data for Testing
    - Icons : Contains Images used for icons in the app
    - Map : Contains Maps for each convention
    - Refs : Contains Code that was used as reference during development (makes it easier to refer back on)

![image](scuffed-system-diagram.png)

# TODOs
- Currently all roads lead to smash from the initial index page
- Make Pan in Map zoom and Pan work
- Make things pretty
- Add accounts
- Add favourites
- Add Markers 
- Add Rally Invites
- Add Rally info Popups
- Add Stall popups
- Make a in-progress/visited marker for rallies
- Create Unique Links for rally invites/Setup

# Other notes:
- I Opted for a Web App since writing code for both ios and android seems painful and I don't wanna pay app store fees or force people to download an app to view stamp rallies
- Working on mobile version first