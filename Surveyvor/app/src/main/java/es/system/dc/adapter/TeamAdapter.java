package es.system.dc.adapter;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
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
import es.system.dc.activity.EditTeamActivity;
import es.system.dc.activity.SurveyListedActivity;
import es.system.dc.model.TeamRaw;
import es.system.dc.model.TokenApp;
import es.system.dc.ui.profile.MyProfileFragment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TeamAdapter extends RecyclerView.Adapter<TeamAdapter.TeamRawViewHolder> {

    private Context context;
    private List<TeamRaw> teams = new ArrayList<>();
    public TeamAdapter(Context context, List<TeamRaw> teams){
        this.context = context;
        if(teams!=null){
            this.teams = teams;
        }

    }

    @NonNull
    @Override
    public TeamRawViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.activity_team_list_model, parent, false);
        return new TeamRawViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull TeamRawViewHolder holder, final int position) {
        holder.id_team_list.setText(String.valueOf(position+1));
        holder.team_name_list.setText(teams.get(position).getTeam_name());

        holder.itemView.setOnClickListener(view ->{
               Intent intent = new Intent(view.getContext(), EditTeamActivity.class);
                intent.putExtra("team_id", teams.get(position).getTeam_id());
                view.getContext().startActivity(intent);
        });

        holder.buttonDeleteTeamRaw.setOnClickListener(view ->{
            AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
            builder.setCancelable(true);
            builder.setTitle("Are you sure?");
            builder.setMessage("You are about to leave this team");
            builder.setPositiveButton("Confirm",
                    new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            String token = TokenApp.getTOKEN();
                            RequestQueue queue = Volley.newRequestQueue(view.getContext());
                            String url ="https://surveyvor.shocklogic.com/api/teamMember/delete/"+teams.get(holder.getAdapterPosition()).getTeam_id();

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
        return teams.size();
    }

    public class TeamRawViewHolder extends RecyclerView.ViewHolder {

        TextView id_team_list, team_name_list;
        Button buttonDeleteTeamRaw;

        public TeamRawViewHolder(@NonNull View itemView) {
            super(itemView);
            id_team_list = itemView.findViewById(R.id.id_team_list);
            team_name_list = itemView.findViewById(R.id.team_name_list);
            buttonDeleteTeamRaw = itemView.findViewById(R.id.buttonDeleteTeam);

        }
    }

}

