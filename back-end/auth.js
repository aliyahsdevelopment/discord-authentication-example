const express = require("express");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const session = require("express-session");
const db = require("./db");
require("dotenv").config();

const router = express.Router();

router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_REDIRECT_URI,
            scope: ["identify"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const [rows] = await db.query(
                    "SELECT * FROM users WHERE discord_id = ?",
                    [profile.id]
                );
                
                if (rows.length === 0) {
                    await db.query(
                        "INSERT INTO users (discord_id, username, avatar) VALUES (?, ?, ?)",
                        [profile.id, profile.username, profile.avatar]
                    );
                } else {
                    await db.query(
                        "UPDATE users SET username = ?, avatar = ? WHERE discord_id = ?",
                        [profile.username, profile.avatar, profile.id]
                    );
                }
                
                return done(null, profile);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

router.get(
    "/login",
    passport.authenticate("discord", { scope: ["identify"] })
);

router.get(
    "/auth/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("http://localhost:5173/");
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy((err) => {
            res.clearCookie('connect.sid');
            res.send('Logged out');
        });
    });
});

router.get("/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

module.exports = router;