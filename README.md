# Game1

2D space game written in java-the-script.

This repo has submodules, so make sure to recursive clone:
```
git clone --recurse-submodules https://github.com/gnarlygnoes/game1.git
```

fiend-ui submodule has been removed and cottontail added. Delete fiend-ui folder and then run this to get cottontail:
```
git submodule update --init --recursive
```

Install dependencies:
```
npm i
```

Run typescript for type-checking:
```
npm run check
```

Build and start server:
```
npm start
```

Go to `http://localhost:5173/`
