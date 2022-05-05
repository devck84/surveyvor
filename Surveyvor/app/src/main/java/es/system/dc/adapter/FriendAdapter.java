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
import es.system.dc.activity.ProfileActivity;
import es.system.dc.activity.SurveyListedActivity;
import es.system.dc.model.FriendRaw;
import es.system.dc.model.TokenApp;
import es.system.dc.model.UserRaw;
import es.system.dc.ui.friend.FriendFragment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FriendAdapter extends RecyclerView.Adapter<FriendAdapter.FriendRawViewHolder> {

    private Context context;
    private List<UserRaw> friends = new ArrayList<>();
    public FriendAdapter(Context context, List<UserRaw> friends){
        this.context = context;
        if(friends!=null){
            this.friends = friends;
        }


    }

    @NonNull
    @Override
    public FriendRawViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.activity_friend_list_model, parent, false);
        return new FriendRawViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull FriendRawViewHolder holder, final int position) {
        holder.id_friend_list.setText(String.valueOf(position+1));
        holder.friend_name_list.setText(friends.get(position).getFirst_name() + " " +  friends.get(position).getFamily_name());
        holder.email_friend_list.setText(friends.get(position).getEmail());

        holder.itemView.setOnClickListener(view ->{
                Intent intent = new Intent(view.getContext(), ProfileActivity.class);
            intent.setData(Uri.parse("https://www.surveyvor-shocklogic.com/user/"+friends.get(holder.getAdapterPosition()).getUser_id()));
                view.getContext().startActivity(intent);
        });

        holder.buttonDeleteFriendRaw.setOnClickListener(view ->{
            AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
            builder.setCancelable(true);
            builder.setTitle("Are you sure?");
            builder.setMessage("You are about to stop being friend of this account");
            builder.setPositiveButton("Confirm",
                    new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            String token = TokenApp.getTOKEN();
                            RequestQueue queue = Volley.newRequestQueue(view.getContext());
                            String url ="https://surveyvor.shocklogic.com/api/userFriend/delete/"+friends.get(holder.getAdapterPosition()).getUser_id();

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
        return friends.size();
    }

    public class FriendRawViewHolder extends RecyclerView.ViewHolder {

        TextView id_friend_list, friend_name_list, email_friend_list;
        Button buttonDeleteFriendRaw;

        public FriendRawViewHolder(@NonNull View itemView) {
            super(itemView);
            id_friend_list = itemView.findViewById(R.id.id_friend_list);
            friend_name_list = itemView.findViewById(R.id.friend_name_list);
            email_friend_list = itemView.findViewById(R.id.email_friend_list);
            buttonDeleteFriendRaw = itemView.findViewById(R.id.buttonDeleteFriend);

        }
    }

}
