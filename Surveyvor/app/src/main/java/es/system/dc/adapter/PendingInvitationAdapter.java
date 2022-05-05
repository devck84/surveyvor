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
import es.system.dc.activity.SurveyListedActivity;
import es.system.dc.model.TokenApp;
import es.system.dc.model.UserRaw;
import es.system.dc.ui.friend.PendingInvitationFragment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PendingInvitationAdapter extends RecyclerView.Adapter<PendingInvitationAdapter.PendingInvitationRawViewHolder> {

    private Context context;
    private List<UserRaw> pendingInvitations = new ArrayList<>();
    public PendingInvitationAdapter(Context context, List<UserRaw> pendingInvitations){
        this.context = context;
        if(pendingInvitations!=null){
            this.pendingInvitations = pendingInvitations;
        }

    }

    @NonNull
    @Override
    public PendingInvitationRawViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.activity_pending_invitation_list_model, parent, false);
        return new PendingInvitationRawViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PendingInvitationRawViewHolder holder, final int position) {
        int pos = position;
        holder.id_pendingInvitation_list.setText(String.valueOf(position+1));
        holder.email_pendingInvitation_list.setText(pendingInvitations.get(position).getEmail());

        holder.buttonAcceptPendingInvitation.setOnClickListener(view ->{
            String token = TokenApp.getTOKEN();
            RequestQueue queue = Volley.newRequestQueue(view.getContext());
            String url ="https://surveyvor.shocklogic.com/api/userFriend/save";

            StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                    new com.android.volley.Response.Listener<String>() {
                        @Override
                        public void onResponse(String res) {
                            String token = TokenApp.getTOKEN();
                            RequestQueue queue = Volley.newRequestQueue(view.getContext());
                            String url ="https://surveyvor.shocklogic.com/api/invitation/delete/"+pendingInvitations.get(holder.getAdapterPosition()).getUser_id();

                            StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                                    new com.android.volley.Response.Listener<String>() {
                                        @Override
                                        public void onResponse(String res) {
                                            Toast.makeText(view.getContext(), "Invitation Accepted!", Toast.LENGTH_SHORT).show();
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
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    System.out.println(error.networkResponse.toString());
                    Toast.makeText(view.getContext(), "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
                }
            }){
                protected Map<String, String> getParams(){
                    Map<String, String> paramV = new HashMap<>();
                    paramV.put("user_id_to", String.valueOf(pendingInvitations.get(holder.getAdapterPosition()).getUser_id()));
                    return paramV;
                }

                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> params = new HashMap<String, String>();
                    params.put("Authorization", token);
                    return params;
                }
            };

            queue.add(stringRequest);
        });

        holder.buttonDenyPendingInvitation.setOnClickListener(view ->{
            AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
            builder.setCancelable(true);
            builder.setTitle("Are you sure?");
            builder.setMessage("You are about to delete this invitation");
            builder.setPositiveButton("Confirm",
                    new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            String token = TokenApp.getTOKEN();
                            RequestQueue queue = Volley.newRequestQueue(view.getContext());
                            String url ="https://surveyvor.shocklogic.com/api/invitation/delete/"+pendingInvitations.get(holder.getAdapterPosition()).getUser_id();

                            StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                                    new com.android.volley.Response.Listener<String>() {
                                        @Override
                                        public void onResponse(String res) {
                                            Toast.makeText(view.getContext(), "Invitation Denied!", Toast.LENGTH_SHORT).show();
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
        return pendingInvitations.size();
    }

    public class PendingInvitationRawViewHolder extends RecyclerView.ViewHolder {

        TextView id_pendingInvitation_list, email_pendingInvitation_list;
        Button buttonDenyPendingInvitation,buttonAcceptPendingInvitation;

        public PendingInvitationRawViewHolder(@NonNull View itemView) {
            super(itemView);
            id_pendingInvitation_list = itemView.findViewById(R.id.id_pending_list);
            email_pendingInvitation_list = itemView.findViewById(R.id.friend_email_list);
            buttonAcceptPendingInvitation = itemView.findViewById(R.id.buttonAcceptInvitation);
            buttonDenyPendingInvitation = itemView.findViewById(R.id.buttonDenyInvitation);
        }
    }

}