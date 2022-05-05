package es.system.dc.adapter;

import android.content.Context;
import android.content.Intent;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;
import com.google.firebase.database.*;
import com.google.gson.Gson;
import es.system.dc.activity.MessageActivity;
import es.system.dc.activity.ProfileActivity;
import es.system.dc.model.Chat;
import es.system.dc.model.Friend;
import es.system.dc.R;
import es.system.dc.model.TokenApp;
import es.system.dc.model.UserRaw;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserAdapter extends RecyclerView.Adapter<UserAdapter.ViewHolder> {

    private Context mContext;
    private List<UserRaw> mUsers;
    private boolean ischat;
    private OnItemClick onItemClick;
    UserRaw me;

    Typeface MR,MRR;
    String theLastMessage;

    public UserAdapter(Context mContext, OnItemClick onItemClick, List<UserRaw> mUsers, boolean ischat, UserRaw me){
        this.onItemClick = onItemClick;
        this.mUsers = mUsers;
        this.mContext = mContext;
        this.ischat = ischat;
        this.me = me;

    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(mContext).inflate(R.layout.user_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        final UserRaw user = mUsers.get(position);
        holder.username.setTypeface(MR);
        holder.last_msg.setTypeface(MRR);

        holder.username.setText(user.getFirst_name());
        if (user.getAvatar()==null){
            holder.profile_image.setImageResource(R.drawable.profile_img);
        } else {
            Glide.with(mContext).load(user.getAvatar()).into(holder.profile_image);
        }




        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(mContext, MessageActivity.class);
                intent.putExtra("userid", String.valueOf(user.getUser_id()));
                mContext.startActivity(intent);
            }
        });


        holder.profile_image.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               onItemClick.onItemCLick(String.valueOf(user.getUser_id()),view);
            }
        });
    }

    @Override
    public int getItemCount() {
        return mUsers.size();
    }

    public  class ViewHolder extends RecyclerView.ViewHolder{

        public TextView username;
        public ImageView profile_image;
        private ImageView img_on;
        private ImageView img_off;
        private TextView last_msg;

        public ViewHolder(View itemView) {
            super(itemView);

            username = itemView.findViewById(R.id.username);
            profile_image = itemView.findViewById(R.id.profile_image);
            img_on = itemView.findViewById(R.id.img_on);
            img_off = itemView.findViewById(R.id.img_off);
            last_msg = itemView.findViewById(R.id.last_msg);
        }
    }

    //check for last message
}
