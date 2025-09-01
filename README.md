# RAT - React Admin Templates
lazy developers react admin templates and scripts 100% organic without ai

# TODO
- [DONE] copy and render logic
- [SKIP] publish to npm and test if it works
- [DONE] make package executable, test local and push to gh
- [DONE] create layout
- [DONE] auth with configurable auth sources
- [DONE] theme
- npm commands for eslint, prettier and playwright
- crud feature generator (need a lot of general comps)
- custom feature generator

# Setup
1. git clone the repo
2. cd into repo and run npm install -g to install it global or in your project dir run npm i PATH_TO_REPO
3. done

# Usage
- ```rat init --name <PROJECT_NAME>  --path <OPTIONAL_PATH>``` creates a new dir with the rat shell

# Project Structure
https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md 

```
src
|
+-- routes              # file based routes
|
+-- assets              # asset folders images, fonts, etc
|
+-- features            # all app features / modules
|
+-- components          # reusable core components
|
+-- utils               # utils
|
+-- lib                 # external lib configs
```

# Dev
- dynamic file names: ```__VAR_NAME__```
- template files just need to end with ```.eta```
