import 'dart:convert';
import 'dart:async';
import 'package:flutter/material.dart';

import 'package:flutter/services.dart';
import 'package:surveyvor_lite/utilities/constants.dart';
import 'package:http/http.dart' as http;

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  String _value="AF - Afghanistan";
  TextEditingController emailController = new TextEditingController();
  TextEditingController passwordController = new TextEditingController();
  TextEditingController firstNameController = new TextEditingController();
  TextEditingController familyNameController = new TextEditingController();
  TextEditingController telephoneController = new TextEditingController();
  TextEditingController avatarController = new TextEditingController();

  Widget _buildEmailTF() {

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          'Email',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            controller: emailController,
            keyboardType: TextInputType.emailAddress,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.only(top: 14.0),
              prefixIcon: Icon(
                Icons.email,
                color: Colors.white,
              ),
              hintText: 'Enter your Email',
              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPasswordTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'Password',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            controller: passwordController,
            obscureText: true,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.only(top: 14.0),
              prefixIcon: Icon(
                Icons.lock,
                color: Colors.white,
              ),
              hintText: 'Enter your Password',
              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFirstNameTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'First Name',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            controller: firstNameController,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.only(top: 14.0),
              prefixIcon: Icon(
                Icons.drive_file_rename_outline,
                color: Colors.white,
              ),
              hintText: 'Enter your First Name',
              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFamilyNameTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'Family Name',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            controller: familyNameController,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.only(top: 14.0),
              prefixIcon: Icon(
                Icons.drive_file_rename_outline,
                color: Colors.white,
              ),
              hintText: 'Enter your Family Name',
              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTelephoneTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'Telephone',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            keyboardType: TextInputType.phone,
            controller: telephoneController,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.only(top: 14.0),
              prefixIcon: Icon(
                Icons.phone,
                color: Colors.white,
              ),
              hintText: 'Enter your Telephone',
              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAvatarTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'Avatar',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            controller: avatarController,
            keyboardType: TextInputType.url,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.only(top: 14.0),
              prefixIcon: Icon(
                Icons.person,
                color: Colors.white,
              ),
              hintText: 'Enter your Avatar Link',
              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    );
  }
   loadCountry() async {
     List<String> items = [];

    http.Response response = await http.get(
      Uri.parse('https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json'),
      headers: {
        "Content-Type": "application/json"
      },
    );

    var data = jsonDecode(response.body);
    for(var countries in data){
      items.add(countries["code"]+" - "+countries["name"]);
    }

    return items;

  }

  Widget _buildCountryTF() {
    List<String> items;
    return FutureBuilder<dynamic>(
      future: loadCountry(),
      builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.waiting: return(Container(margin: const EdgeInsets.only(top: 20.0),child:Text('Loading....',style: const TextStyle(color: Colors.white))));
          default:
            if (snapshot.hasError)
              return Text('Error: ${snapshot.error}');
            else
              items = snapshot.data;
              return Column(

                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  SizedBox(height: 30.0),
                  Text(
                    'Country',
                    style: kLabelStyle,
                  ),
                  SizedBox(height: 10.0),
                  Container(
                    alignment: Alignment.centerLeft,
                    decoration: kBoxDecorationStyle,
                    height: 60.0,
                    padding: EdgeInsets.fromLTRB(20, 0, 20, 0),

                    child:

                    DropdownButtonHideUnderline(


                      child: DropdownButton(
                        isExpanded: true,

                        dropdownColor: Color(0xFF398AE5),
                        value: _value,
                        icon: const Icon(Icons.keyboard_arrow_down),
                        // Array list of items
                        items: items.map((String items) {
                          return DropdownMenuItem(

                            value: items,
                            child: Text(

                              items,
                              style: const TextStyle(color: Colors.white),
                            ),
                          );
                        }).toList(),
                        // After selecting the desired option,it will
                        // change button value to selected value
                        onChanged: (String? newValue) {
                          setState(() {
                            _value = newValue??_value;
                          });
                        },
                      ),
                    ),
                  ),
                ],
              );
        }
      },
    );


  }

  Widget _buildLoginBtn() {
    return Container(
      margin: const EdgeInsets.only(top: 10.0),
      padding: EdgeInsets.symmetric(vertical: 25.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () => {signUpAttempt()},
        padding: EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30.0),
        ),
        color: Colors.white,
        child: Text(
          'SIGN UP',
          style: TextStyle(
            color: Color(0xFF527DAA),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  signUpAttempt() async{
    String email = emailController.text;
    String password = passwordController.text;
    String firstName = firstNameController.text;
    String familyName = familyNameController.text;
    String text = "Error";

    if(email.isEmpty ||
        password.isEmpty ||
        firstName.isEmpty ||
        familyName.isEmpty){
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text("Whoops! there are missing fields"),
      ));
      return;
    }

    String telephone = telephoneController.text;
    String avatar = avatarController.text;

    http.Response response = await http.post(
      Uri.parse('https://surveyvor.shocklogic.com/api/auth/register'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
        'first_name': firstName,
        'family_name': familyName,
        'telephone': telephone,
        'avatar': avatar,
        'country_code': _value.split(" - ")[0]
      }),
    );

    if(response.statusCode == 200 || response.statusCode == 201){
      text = "Successfully registered!";
    }else{
      text = "Whoops, something went wrong";
    }

    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(text),
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Registration'),
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
                      Color(0xFF73AEF5),
                      Color(0xFF61A4F1),
                      Color(0xFF478DE0),
                      Color(0xFF398AE5),
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
                    horizontal: 50.0,
                    vertical: 40.0,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[

                      Container(
                        child: Image(
                          image: NetworkImage('https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png'),
                          height: 250.0,

                        ),
                      ),
                      SizedBox(height: 30.0),
                      _buildEmailTF(),
                      _buildPasswordTF(),
                      _buildFirstNameTF(),
                      _buildFamilyNameTF(),
                      _buildTelephoneTF(),
                      _buildAvatarTF(),
                      _buildCountryTF(),
                      _buildLoginBtn(),
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