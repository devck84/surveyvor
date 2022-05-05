package es.system.dc.activity;

import android.content.Intent;
import android.graphics.Color;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.github.mikephil.charting.charts.BarChart;
import com.github.mikephil.charting.charts.CombinedChart;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.*;
import com.github.mikephil.charting.utils.ColorTemplate;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import es.system.dc.R;
import es.system.dc.model.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StatsActivity extends AppCompatActivity {
    Integer question_id;
    List<AnswerPerSurvey> answers = new ArrayList<>();
    ArrayList<PieEntry> entries = new ArrayList<>();
    PieChart pieChart;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stats);
        pieChart = findViewById(R.id.statsBySurvey);
        Intent intent = getIntent();
        question_id = intent.getIntExtra("question_id",0);
        loadStatEntry();

    }
    public void loadStatEntry(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/stats/answerPerQuestion/"+question_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        answers = gson.fromJson(res,  new TypeToken<List<AnswerPerSurvey>>(){}.getType());
                        for (AnswerPerSurvey u: answers) {
                            entries.add(new PieEntry(Math.round(u.getAnswer_count()), u.getAnswer_text()));
                        }

                        PieDataSet pieDataSet = new PieDataSet(entries, "Answers");
                        pieDataSet.setColors(ColorTemplate.COLORFUL_COLORS);
                        pieDataSet.setValueTextColor(Color.BLACK);
                        pieDataSet.setValueTextSize(16f);
                        PieData pieData = new PieData(pieDataSet);
                        pieChart.setData(pieData);
                        pieChart.getDescription().setEnabled(false);
                        pieChart.setCenterText("Answers");
                        pieChart.animate();
                        pieChart.invalidate();

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(StatsActivity.this, "Whoops! try to login first", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(StatsActivity.this, MainActivity.class);
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