package es.system.dc.activity;

import android.content.Intent;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import es.system.dc.R;
import es.system.dc.model.TeamCreated;
import es.system.dc.model.TokenApp;
import es.system.dc.ui.team.TeamFragment;

import java.util.HashMap;
import java.util.Map;

public class CreateTeamActivity extends AppCompatActivity {
    EditText team_name, team_description;
    TeamCreated team;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_team);
        team_name = findViewById(R.id.team_name_create);
        team_description = findViewById(R.id.team_description_create);
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
        String url ="https://surveyvor.shocklogic.com/api/team/save";

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        team = gson.fromJson(res, TeamCreated.class);

                        addMeTeamMember();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(CreateTeamActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
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

    public void addMeTeamMember(){
        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/teamMember/save";

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Toast.makeText(CreateTeamActivity.this, "Successfully created", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(CreateTeamActivity.this, SurveyListedActivity.class);
                        startActivity(intent);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(CreateTeamActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){

            protected Map<String, String> getParams(){
                Map<String, String> paramV = new HashMap<>();
                paramV.put("team_id", String.valueOf(team.getTeam().getTeam_id()));

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