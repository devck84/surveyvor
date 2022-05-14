import 'package:flutter/material.dart';
class Friend {
  var user_id, email, first_name, family_name, avatar, telephone, password, country_code;

  Friend(var user_id,
      var email,
      var first_name,
      var family_name,
      var avatar,
      var telephone,
      var password,
      var country_code) {

    this.user_id = user_id;
    this.email = email;
    this.first_name = first_name;
    this.family_name = family_name;
    this.avatar = avatar;
    this.telephone = telephone;
    this.password = password;
    this.country_code = country_code;
  }
}