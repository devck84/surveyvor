package es.system.dc.activity;

import android.content.Intent;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import es.system.dc.R;
import es.system.dc.model.Question;
import es.system.dc.model.QuestionRaw;
import es.system.dc.model.TokenApp;

import java.util.HashMap;
import java.util.Map;

public class QuestionsPerSurveyActivity extends AppCompatActivity {
    Integer survey_id;
    Question quests;
    LinearLayout linearLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(es.system.dc.R.layout.activity_questions_per_survey);
       linearLayout = findViewById(R.id.list_questions);
        Intent intent = getIntent();
        survey_id = intent.getIntExtra("survey_id",0);
        loadQuestions();
    }

    public void loadQuestions(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/question/all/"+survey_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(540, LinearLayout.LayoutParams.WRAP_CONTENT);
                        Gson gson = new Gson();
                        quests = gson.fromJson(res, Question.class);
                        for (QuestionRaw c : quests.getQuestion()) {
                            Button btnQuest = new Button(linearLayout.getContext());
                            btnQuest.setText(c.getQuestion_text());
                            btnQuest.setOnClickListener(v->{
                                Intent intent = new Intent(QuestionsPerSurveyActivity.this, StatsActivity.class);
                                intent.putExtra("question_id", c.getQuestion_id());
                                startActivity(intent);
                            });
                            btnQuest.setLayoutParams(params);
                            linearLayout.addView(btnQuest);
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(QuestionsPerSurveyActivity.this, "Whoops! try to login first", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(QuestionsPerSurveyActivity.this, MainActivity.class);
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
}