import mysql from 'mysql';
import express from 'express';
import { conn } from "../dbconn";

export const router = express.Router();

router.post("/movie", (req, res) => {
    conn.query(mysql.format("insert into `MOVIE` (`name`) values (?)", req.body.name), (err, result) => {
        if (err) throw err;
        res
            .status(201)
            .json({
                affected_row: result.affectedRows,
                last_idx: result.insertId
            });
    });
});

router.post("/person", (req, res) => {
    conn.query(mysql.format("insert into `PERSON` (`name`) values (?)", req.body.name), (err, result) => {
        if (err) throw err;
        res.status(201).json({
            affected_row: result.affectedRows,
            last_idx: result.insertId
        });
    });
});

router.post("/stars", (req, res) => {
    conn.query(mysql.format("insert into `STARS` (`mid`, `pid`) values (?, ?)", [req.body.mid, req.body.pid]), (err, result) => {
        if (err) throw err;
        res.status(201).json({
            affected_row: result.affectedRows,
        })
    })
});

router.post("/creators", (req, res) => {
    conn.query(mysql.format("insert into `CREATORS` (`mid`, `pid`) values (?, ?)", [req.body.mid, req.body.pid]), (err, result) => {
        if (err) throw err;
        res.status(201).json({
            affected_row: result.affectedRows,
        })
    })
});