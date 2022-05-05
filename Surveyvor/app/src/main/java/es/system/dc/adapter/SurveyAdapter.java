package es.system.dc.adapter;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import es.system.dc.R;
import es.system.dc.activity.EditSurveyActivity;
import es.system.dc.activity.SurveyListedActivity;
import es.system.dc.model.SurveyRaw;
import es.system.dc.model.TokenApp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SurveyAdapter extends RecyclerView.Adapter<SurveyAdapter.SurveyRawViewHolder> {

        private Context context;
        private List<SurveyRaw> surveys = new ArrayList<>();;
        public SurveyAdapter(Context context, List<SurveyRaw> surveys){
            this.context = context;
            if(surveys!=null){
            this.surveys = surveys;
            }

        }

        @NonNull
        @Override
        public SurveyRawViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            LayoutInflater inflater = LayoutInflater.from(context);
            View view = inflater.inflate(R.layout.activity_survey_list_model, parent, false);
            return new SurveyRawViewHolder(view);
        }

        @Override
        public void onBindViewHolder(@NonNull SurveyRawViewHolder holder, final int position) {
            holder.id_survey_list.setText(String.valueOf(position+1));
            holder.survey_name_list.setText(surveys.get(position).getSurvey_name());
            holder.date_created_list.setText(surveys.get(position).getDate_created());
            holder.active_list.setText(surveys.get(position).getActive()==1?"Active":"Inactive");

            holder.itemView.setOnClickListener(view ->{
                Intent intent = new Intent(view.getContext(), EditSurveyActivity.class);
                intent.putExtra("survey_id", surveys.get(position).getSurvey_id());
                view.getContext().startActivity(intent);
            });

            holder.buttonDeleteSurveyRaw.setOnClickListener(view ->{
                AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
                builder.setCancelable(true);
                builder.setTitle("Are you sure?");
                builder.setMessage("You are about to delete this survey and answers from it as well");
                builder.setPositiveButton("Confirm",
                        new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                String token = TokenApp.getTOKEN();
                                RequestQueue queue = Volley.newRequestQueue(view.getContext());
                                String url ="https://surveyvor.shocklogic.com/api/survey/delete/"+surveys.get(holder.getAdapterPosition()).getSurvey_id();

                                StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                                        new com.android.volley.Response.Listener<String>() {
                                            @Override
                                            public void onResponse(String res) {
                                                Toast.makeText(view.getContext(), "Deleted!", Toast.LENGTH_SHORT).show();
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
            });

        }



        @Override
        public int getItemCount() {
            return surveys.size();
        }

        public class SurveyRawViewHolder extends RecyclerView.ViewHolder {

            TextView id_survey_list, survey_name_list, date_created_list, active_list;
            Button buttonDeleteSurveyRaw;

            public SurveyRawViewHolder(@NonNull View itemView) {
                super(itemView);
                id_survey_list = itemView.findViewById(R.id.id_survey_list);
                survey_name_list = itemView.findViewById(R.id.survey_name_list);
                date_created_list = itemView.findViewById(R.id.date_created_list);
                active_list = itemView.findViewById(R.id.active_list);
                buttonDeleteSurveyRaw = itemView.findViewById(R.id.buttonDeleteSurvey);

            }
        }
    
}
