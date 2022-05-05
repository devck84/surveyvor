package es.system.dc.activity;

import android.content.Intent;
import android.text.TextUtils;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import es.system.dc.R;
import es.system.dc.model.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EditTeamActivity extends AppCompatActivity {
    Integer team_id;
    EditText team_name, team_description;
    TeamCreated team;
    TeamMember teamMembers;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_team);
        Intent intent = getIntent();
        team_name = findViewById(R.id.team_name_update);
        team_description = findViewById(R.id.team_description_update);
        team_id = intent.getIntExtra("team_id",1);
        loadTeam();
        loadTeamMembers();
    }

    public void loadTeam(){
        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/team/all/"+team_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        team = gson.fromJson(res, TeamCreated.class);
                        team_name.setText(team.getTeam().getTeam_name());
                        team_description.setText(team.getTeam().getTeam_description());
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(EditTeamActivity.this, "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
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

    public void loadTeamMembers(){
        LinearLayout linearLayout = findViewById(R.id.edit_team_comp);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(540, LinearLayout.LayoutParams.WRAP_CONTENT);
        params.topMargin = 10;

        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/teamMember/all/"+team_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        teamMembers = gson.fromJson(res, TeamMember.class);
                        for (int i=0; i<teamMembers.getUser().size();i++){

                            TextView teamMemberText = new TextView(linearLayout.getContext());
                            teamMemberText.setText(teamMembers.getUser().get(i).getEmail());
                            teamMemberText.setLayoutParams(params);
                            linearLayout.addView(teamMemberText,6+i);
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(EditTeamActivity.this, "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
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

    public void createTeam(View v){
        if(TextUtils.isEmpty(team_name.getText().toString()) ||
                TextUtils.isEmpty(team_description.getText().toString())
        ){
            Toast.makeText(this, "Whoops!, there are missing fields", Toast.LENGTH_SHORT).show();
            return;
        }

        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/team/update/"+team_id;

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Toast.makeText(EditTeamActivity.this, "Successfully updated", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(EditTeamActivity.this, SurveyListedActivity.class);
                        startActivity(intent);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(EditTeamActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){

            protected Map<String, String> getParams(){
                Map<String, String> paramV = new HashMap<>();
                paramV.put("team_name", team_name.getText().toString());
                paramV.put("team_description",team_description.getText().toString());

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
}