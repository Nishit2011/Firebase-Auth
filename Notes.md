we shouldnt only handling the hiding and showing of contest from the front end
but should also handle it via permission settings in security rules of database

the security rule in firebase needs to be changed so that
only logged in user have the rights to read and write data

so go to firebase console and change the security rules of the database by doing something as follows:

below firebase rules are defined to check if only guide collection is allowed for read,write access

match /guides/{guideId}{
allow read, write: if request.auth.uid != null;
}
}

######

this rule defines that any collection is allowed read, write access

match /{document=\*\*}{
allow read, write;
}

######

this rule defines that logged in user is used to create and read records
there is diff b/w write and create as using former we can edit and create while using create we can only create records

//match logged in user doc in users collection
match /users/{userId}{
allow create: if request.auth.uid !=null
allow read: if request.auth.uid == userId
}

##################################################

Only admins can write new guides
