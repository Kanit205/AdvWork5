import mysql from 'mysql';
import express from 'express';
import { conn } from "../dbconn";

export const router = express.Router();

router.delete("/movie/:mid", (req, res) => {
    conn.query(mysql.format("delete from MOVIE where mid = ?", [req.params.mid]), (err, result) => {
        if (err) throw err;
        res.status(200).json({
            affected_row: result.affectedRows
        });
    });
});

router.delete("/person/:pid", (req, res) => {
    conn.query(mysql.format("delete from PERSON where pid = ?", [req.params.pid]), (err, result) => {
        if (err) throw err;
        res.status(200).json({
            affected_row: result.affectedRows
        });
    });
});

router.delete("/stars/:sid", (req, res) => {
    conn.query(mysql.format("delete from STARS where sid = ?", [req.params.sid]), (err, result) => {
        if (err) throw err;
        res.status(200).json({
            affected_row: result.affectedRows
        });
    });
});

router.delete("/creators/:crid", (req, res) => {
    conn.query(mysql.format("delete from MOVIE where crid = ?", [req.params.crid]), (err, result) => {
        if (err) throw err;
        res.status(200).json({
            affected_row: result.affectedRows
        });
    });
});