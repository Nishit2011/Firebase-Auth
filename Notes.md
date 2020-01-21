we shouldnt only handling the hiding and showing of contest from the front end
but should also handle it via permission settings in security rules of database

the security rule in firebase needs to be changed so that
only logged in user have the rights to read and write data

so go to firebase console and change the security rules of the database by doing something as follows:

match /guides/{guideId}{
allow read, write: if request.auth.uid != null;
}
}
