import { queryAsync } from './../dbconn';
import mysql from 'mysql';
import express from 'express';
import { conn } from "../dbconn";

export const router = express.Router();

router.get("/", async (req, res) => {
    conn.query(mysql.format(`SELECT * FROM MOVIE WHERE title LIKE ?`, ['%' + req.query.s + '%']), (err, movies) => {
        if (err) throw err;
        
        conn.query(mysql.format(`SELECT * FROM PERSON JOIN STARS ON PERSON.pid = STARS.pid WHERE STARS.mid IN (SELECT mid FROM MOVIE WHERE title LIKE ?)`, ['%' + req.query.s + '%']), (err, stars) => {
            if (err) throw err;

            conn.query(mysql.format(`SELECT * FROM PERSON JOIN CREATORS ON PERSON.pid = CREATORS.pid WHERE CREATORS.mid IN (SELECT mid FROM MOVIE WHERE title LIKE ?)`, ['%' + req.query.s + '%']), (err, creators) => {
                if (err) throw err;

                res.json({
                    movies: movies.map((movie: any) => ({
                        ...movie,
                        Stars: stars.filter((star : any) => star.mid === movie.mid).map((star: any) => ({
                            pid: star.pid,
                            name: star.name
                        })),
                        Creators: creators.filter((creator: any) => creator.mid === movie.mid).map((creator: any) => ({
                            pid: creator.pid,
                            name: creator.name
                        }))
                    }))
                })
            });
        });
    });
});