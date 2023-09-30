import * as SQLite from "expo-sqlite";
import { Place } from "../types";

const db = SQLite.openDatabase("places.db");

export const init = () =>
    new Promise<SQLite.SQLTransaction>((resolve, reject) =>
        db.transaction(tx =>
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
					id INTEGER PRIMARY KEY NOT NULL,
					title TEXT NOT NULL,
					imageURI TEXT NOT NULL,
					address TEXT NOT NULL,
					lat REAL NOT NULL,
					lng REAL NOT NULL
				)`,
                [],
                data => resolve(data),
                (_, error) => {
                    reject(error);
                    return true;
                }
            )
        )
    );

export const insertPlace = (place: Omit<Place, "id">) =>
    new Promise<SQLite.SQLResultSet>((resolve, reject) =>
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO places (title, imageURI, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
                [
                    place.title,
                    place.imageURI,
                    place.address,
                    place.location.lat,
                    place.location.lng,
                ],
                (_, result) => resolve(result),
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        })
    );

export const fetchPlaces = () =>
    new Promise<SQLite.SQLResultSet>((resolve, reject) =>
        db.transaction(tx =>
            tx.executeSql(
                `SELECT * FROM places`,
                [],
                (_, result) => resolve(result),
                (_, error) => {
                    reject(error);
                    return true;
                }
            )
        )
    );
