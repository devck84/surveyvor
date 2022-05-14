import 'dart:convert';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:surveyvor_lite/screens/edit_team_screen.dart';
import 'package:surveyvor_lite/utilities/globals.dart' as globals;

import 'package:flutter/services.dart';
import 'package:surveyvor_lite/models/survey_model.dart';
import 'package:surveyvor_lite/screens/navbar.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:surveyvor_lite/models/team_model.dart';

class TeamListScreen extends StatefulWidget {
  @override
  _TeamListScreenState createState() => _TeamListScreenState();
}

class _TeamListScreenState extends State<TeamListScreen> {

  loadTeams() async{
    List<Team> items = [];

    http.Response response = await http.get(
      Uri.parse('https://surveyvor.shocklogic.com/api/team/mine'),
      headers: {
        "Content-Type": "application/json",
        "Authorization":globals.token
      },
    );

    var data = jsonDecode(response.body);
    for(var s in data["teams"]){
      Team team=new Team(s["team_id"].toString(), s["user_id"].toString(),  s["team_name"].toString(), s["team_description"].toString(), s["team_url_invitation"].toString());
      items.add(team);
    }

    return items;
  }

  Widget buildTeams(){
    List<Team> teams;
    return FutureBuilder<dynamic>(
      future: loadTeams(),
      builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.waiting: return(Container(margin: const EdgeInsets.only(top: 20.0),child:Text('Loading....',style: const TextStyle(color: Colors.white))));
          default:
            if (snapshot.hasError)
              return Text('Error: ${snapshot.error}');
            else
              teams = snapshot.data;
            return Container(
                child: Column(
                  children: [
                    for ( var s in teams )
                      Container(
                        margin: const EdgeInsets.only(top: 15.0),
                        child:
                        GestureDetector(
                          onTap: () => {Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => EditTeamScreen(s.team_id)))},
                          child:
                          Card(

                            color:Colors.blue[900],
                            child: ListTile(
                              leading: Icon(Icons.group_outlined, size: 45),
                              textColor: Colors.white,
                              title: Text(s.team_name.toString(),
                                style: TextStyle(
                                    fontWeight: FontWeight. bold,
                                    fontSize: 18
                                ),
                              ),
                              subtitle: Text(s.team_description),
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
        title: const Text('Teams'),
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
                      buildTeams(),
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