'use strict';
/*---------------ACTOR Auth----------------------*/
var mongoose = require('mongoose'),
    Actor = mongoose.model('Actor');
var admin = require('firebase-admin');


/**Coge el UID (email del usuario) y verifica si está en base de datos */
exports.getUserId = async function (idToken) {
    //console.log('idToken: ' + idToken);
    var id = null;

    var actorFromFB = await admin.auth().verifyIdToken(idToken);

    var uid = actorFromFB.uid;
    var auth_time = actorFromFB.auth_time;
    var exp = actorFromFB.exp;
    //console.log('idToken verificado para el uid: ' + uid);
    //console.log('auth_time: ' + auth_time);
    //console.log('exp: ' + exp);

    var mongoActor = await Actor.findOne({ email: uid });
    if (!mongoActor) { return null; }

    else {
        console.log(Date()+': The actor exists in our DB');
        console.log(Date()+': --->Actor to edit: ' + mongoActor.name);
        id = mongoActor._id;
        return id;
    }
}


/**Se cogen los roles que son requeridos
 * Cogemos el idToken y comprobamos si tiene un rol válido
 */
exports.verifyUser = function (requiredRoles) {
    return function (req, res, callback) {
        console.log(Date() + ': Verifying idToken...');
        console.log(Date() + ': RequiredRoles: ' + requiredRoles);
        var idToken = req.headers['idtoken'];
        //console.log('idToken: ' + idToken);

        admin.auth().verifyIdToken(idToken).then(function (decodedToken) {

            //UID=email
            var uid = decodedToken.uid;
            //Cuando se autenticó
            var auth_time = decodedToken.auth_time;
            //Cuando explira la sesión
            var exp = decodedToken.exp;
            console.log(Date() + ': Token Verified for the user: ' + uid);
            console.log(Date() + ': Token Authoritation time: ' + auth_time);
            console.log(Date() + ': Token Expire time: ' + exp);

            Actor.findOne({ email: uid }, function (err, actor) {
                if (err) { res.send(err); }

                // No actor found with that email as username
                else if (!actor) {
                    res.status(401); //an access token isn’t provided, or is invalid
                    res.json({ message: 'No actor found with the provided email as username', error: err });
                }

                else {
                    console.log(Date() + ': The actor exists in our DB');
                    console.log(Date() + ': --->Name: ' + actor.name);
                    console.log(Date() + ': --->Email: ' + actor.email);
                    console.log(Date() + ': --->Role: ' + actor.role);

                    var isAuth = false;
                    //for (var i = 0; i < requiredRoles.length; i++) {
                    //  for (var j = 0; j < actor.role.length; j++) {
                    if (requiredRoles.includes(actor.role)) {
                        if (actor.banned) {
                            console.log(Date() + ": The actor with email: '" + actor.email + "' is " + actor.role + " and it is banned!");
                            isAuth = false;
                        } else {
                            console.log(Date() + ": The actor with email: '" + actor.email + "' is " + actor.role + " and is verified!");
                            isAuth = true;
                        }
                    }
                    //}
                    //}
                    if (isAuth) return callback(null, actor);
                    else {
                        console.log(Date() + ": The actor has not the required roles.");
                        res.status(403); //an access token is valid, but requires more privileges
                        res.json({ message: 'The actor has not the required roles', error: err });
                    }
                }
            });
        }).catch(function (err) {
            // Handle error
            console.log(Date() + "Error in the authentication: " + err);
            res.status(403); //an access token is valid, but requires more privileges
            res.json({ message: 'The actor has not the required roles', error: err });
        });
    }
}
