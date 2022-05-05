package es.system.dc.activity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.constraintlayout.widget.ConstraintSet;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.squareup.picasso.Picasso;
import es.system.dc.R;
import es.system.dc.model.*;

import java.util.HashMap;
import java.util.Map;

public class ProfileActivity extends AppCompatActivity {
    User profileUser;
    UserRaw useR;
    Integer user_id;
    TextView profile_name, profile_email;
    Button multi_profile_button;
    Integer typeOfButton = 0; //0: Add Friend; 1: Chat
    Survey surveysUser;
    ConstraintLayout constraint_profile;
    ImageView profile_image;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        Intent intent = getIntent();
        Uri data = intent.getData();
        try {
            user_id = Integer.parseInt(data.getPath().split("user/")[1]);
        } catch (NumberFormatException nfe) {
            Toast.makeText(ProfileActivity.this, "Whoops! It looks like a wrong link", Toast.LENGTH_SHORT).show();
        }

        profile_name = findViewById(R.id.profile_name);
        profile_email = findViewById(R.id.profile_email);
        multi_profile_button = findViewById(R.id.multi_profile_button);
        constraint_profile = findViewById(R.id.constraint_profile);
        profile_image = findViewById(R.id.profile_image);
        loadProfile();
        publicSurveys();
        isFriend();
    }



    public void loadProfile(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/auth/all/"+user_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        profileUser = gson.fromJson(res, User.class);
                        useR = profileUser.getUser();
                        profile_name.setText(useR.getFirst_name()+" "+useR.getFamily_name());
                        profile_email.setText(useR.getEmail());
                        if(useR.getAvatar()!=null){
                            Picasso.get().load(useR.getAvatar()).into(profile_image);
                        }

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(ProfileActivity.this, "Whoops! something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", token);
                return params;
            }
        };

        queue.add(stringRequest);
    }

    public void publicSurveys(){

        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/survey/user/"+user_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Integer i = 0;
                        Gson gson = new Gson();
                        surveysUser = gson.fromJson(res, Survey.class);
                        for (SurveyRaw s: surveysUser.getSurvey()) {
                            i++;
                            Button btnSurvey = new Button(constraint_profile.getContext());
                            btnSurvey.setId(s.getSurvey_id());
                            btnSurvey.setText(s.getSurvey_name());
                            btnSurvey.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    openSurvey(s.getSurvey_id());
                                }
                            });
                            ConstraintLayout.LayoutParams params = new ConstraintLayout.LayoutParams(ConstraintLayout.LayoutParams.MATCH_PARENT, ConstraintLayout.LayoutParams.WRAP_CONTENT);
                            btnSurvey.setPadding(0,15,0,15);
                            btnSurvey.setLayoutParams(params);

                            btnSurvey.setId(View.generateViewId());

                            btnSurvey.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);

                            constraint_profile.addView(btnSurvey);

                            ConstraintSet constraintSet = new ConstraintSet();
                            constraintSet.clone(constraint_profile);
                            constraintSet.connect(btnSurvey.getId(), ConstraintSet.END , R.id.public_survey_title, ConstraintSet.END,35);
                            constraintSet.connect(btnSurvey.getId(), ConstraintSet.START, R.id.public_survey_title,ConstraintSet.START,35);
                            constraintSet.connect(btnSurvey.getId(), ConstraintSet.TOP, R.id.public_survey_title, ConstraintSet.TOP,70*i);
                            constraintSet.applyTo(constraint_profile);
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(ProfileActivity.this, "Whoops! something went wrong", Toast.LENGTH_SHORT).show();

            }
        }){
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", token);
                return params;
            }
        };

        queue.add(stringRequest);
    }

    public void openSurvey(Integer survey_id){
        Intent intent = new Intent(ProfileActivity.this, AnswerSurveyActivity.class);
        intent.setData(Uri.parse("https://www.survey-shocklogic.com/survey/"+survey_id));
        startActivity(intent);
    }

    public void isFriend(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/userFriend/mine/";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        Friend friendsUser = gson.fromJson(res, Friend.class);
                        for (UserRaw u: friendsUser.getFriend()) {
                            if(u.getUser_id() == user_id){
                                multi_profile_button.setText("Chat");
                                typeOfButton = 1;
                                break;
                            }
                        }

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(ProfileActivity.this, "Whoops! try to login first", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(ProfileActivity.this, MainActivity.class);
                startActivity(intent);
            }
        }){
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", token);
                return params;
            }
        };

        queue.add(stringRequest);
    }

    public void multiButtonClick(View view){
        if(typeOfButton==0){
            AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
            builder.setCancelable(true);
            builder.setTitle("Are you sure?");
            builder.setMessage("You are about to send an Invitation");
            builder.setPositiveButton("Confirm",
                    new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            String token = TokenApp.getTOKEN();
                            RequestQueue queue = Volley.newRequestQueue(view.getContext());
                            String url ="https://surveyvor.shocklogic.com/api/invitation/save/";

                            StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                                    new com.android.volley.Response.Listener<String>() {
                                        @Override
                                        public void onResponse(String res) {
                                            Toast.makeText(view.getContext(), "Sent!", Toast.LENGTH_SHORT).show();
                                            Intent intent = new Intent(view.getContext(), SurveyListedActivity.class);
                                            view.getContext().startActivity(intent);
                                        }
                                    }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    System.out.println(error.networkResponse.toString());
                                    Toast.makeText(view.getContext(), "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
                                }
                            }){

                                protected Map<String, String> getParams(){
                                    Map<String, String> paramV = new HashMap<>();
                                    paramV.put("receiver_id", String.valueOf(user_id));

                                    return paramV;
                                }

                                public Map<String, String> getHeaders() throws AuthFailureError {
                                    Map<String, String> params = new HashMap<String, String>();
                                    params.put("Authorization", token);
                                    return params;
                                }
                            };

                            queue.add(stringRequest);
                        }
                    });
            builder.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {}
            });
            AlertDialog dialog = builder.create();
            dialog.show();
        }else if(typeOfButton==1){
            Intent intent = new Intent(ProfileActivity.this, MessageActivity.class);
            intent.putExtra("userid", String.valueOf(user_id));
            startActivity(intent);
        }
    }
}