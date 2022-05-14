import 'dart:convert';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:surveyvor_lite/models/friend_model.dart';
import 'package:surveyvor_lite/utilities/globals.dart' as globals;

import 'package:flutter/services.dart';
import 'package:surveyvor_lite/models/survey_model.dart';
import 'package:surveyvor_lite/screens/navbar.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:surveyvor_lite/models/team_model.dart';

class FriendListScreen extends StatefulWidget {
  @override
  _FriendListScreenState createState() => _FriendListScreenState();
}

class _FriendListScreenState extends State<FriendListScreen> {

  loadFriends() async{
    List<Friend> items = [];

    http.Response response = await http.get(
      Uri.parse('https://surveyvor.shocklogic.com/api/userFriend/mine'),
      headers: {
        "Content-Type": "application/json",
        "Authorization":globals.token
      },
    );

    var data = jsonDecode(response.body);
    for(var s in data["friend"]){
      Friend friend=new Friend(s["user_id"].toString(), s["email"].toString(),  s["first_name"].toString(), s["family_name"].toString(), s["avatar"].toString(),s["telephone"].toString(),s["password"].toString(),s["country_code"].toString());
      items.add(friend);
    }

    return items;
  }

  Widget buildFriends(){
    List<Friend> friends;
    return FutureBuilder<dynamic>(
      future: loadFriends(),
      builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.waiting: return(Container(margin: const EdgeInsets.only(top: 20.0),child:Text('Loading....',style: const TextStyle(color: Colors.white))));
          default:
            if (snapshot.hasError)
              return Text('Error: ${snapshot.error}');
            else
              friends = snapshot.data;
            return Container(
                child: Column(
                  children: [
                    for ( var s in friends )
                      Container(
                        margin: const EdgeInsets.only(top: 15.0),
                        child:
                        GestureDetector(
                          onTap: () => {
                            Clipboard.setData(ClipboardData(text: s.email)),
                            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text("Email Copied"),
                            ))
                          },
                          child:
                          Card(

                            color:Colors.blue[900],
                            child: ListTile(
                              leading: Icon(Icons.group_outlined, size: 45),
                              textColor: Colors.white,
                              title: Text(s.family_name + ' ' + s.first_name,
                                style: TextStyle(
                                    fontWeight: FontWeight. bold,
                                    fontSize: 18
                                ),
                              ),
                              subtitle: Text(s.email),
                            ),
                          ),),
                      )

                  ],
                )
            );
        }
      },
    );

  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      drawer: NavBar(),
      appBar: AppBar(
        title: const Text('Friends'),
      ),
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.light,
        child: GestureDetector(
          onTap: () => FocusScope.of(context).unfocus(),
          child: Stack(
            children: <Widget>[
              Container(
                height: double.infinity,
                width: double.infinity,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Color(0xFF398AE5),
                      Color(0xFF478DE0),
                      Color(0xFF61A4F1),
                      Color(0xFF73AEF5),


                    ],
                    stops: [0.1, 0.4, 0.7, 0.9],
                  ),
                ),
              ),
              Container(
                height: double.infinity,
                child: SingleChildScrollView(
                  physics: AlwaysScrollableScrollPhysics(),
                  padding: EdgeInsets.symmetric(
                    horizontal: 20.0,
                    vertical: 10.0,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      buildFriends(),
                      //   _buildLoginBtn(),
                      //   _buildSignupBtn(),
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),

    );
  }

}