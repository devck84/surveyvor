package es.system.dc.activity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Typeface;
import android.os.Bundle;
import android.os.Handler;
import android.view.Menu;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;
import com.google.gson.Gson;
import es.system.dc.R;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager.widget.ViewPager;
import com.google.android.material.tabs.TabLayout;
import com.google.firebase.database.*;
import de.hdodenhof.circleimageview.CircleImageView;
import es.system.dc.adapter.OnItemClick;
import es.system.dc.model.Chat;
import es.system.dc.model.TokenApp;
import es.system.dc.model.UserRaw;
import es.system.dc.ui.chat.ChatsFragment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MainChatActivity extends AppCompatActivity implements OnItemClick {

    boolean doubleBackToExitPressedOnce = false;
    CircleImageView profile_image;
    TextView username;
    ProgressDialog dialog;
    Typeface MR,MRR;

    DatabaseReference reference;
    UserRaw me;
    OnItemClick onItemClick;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_chat);
        loadUser();

        this.onItemClick = this;

        //setSupportActionBar(toolbar);
        //getSupportActionBar().setTitle("");


    }

    private void loadUser(){
        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/auth/me";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {

                        Gson gson = new Gson();
                        me = gson.fromJson(res, UserRaw.class);

                        profile_image = findViewById(R.id.profile_image);
                        final TabLayout tabLayout = findViewById(R.id.tab_layout);
                        final ViewPager viewPager = findViewById(R.id.view_pager);


                        username = findViewById(R.id.username);
                        username.setTypeface(MR);

                        reference = FirebaseDatabase.getInstance().getReference("Users").child(String.valueOf(me.getUser_id()));

                        reference.addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                                username.setText(me.getFirst_name());
                                if (me.getAvatar()==null){
                                    profile_image.setImageResource(R.drawable.profile_img);
                                } else {
                                    //change this
                                    Glide.with(getApplicationContext()).load(me.getAvatar()).into(profile_image);
                                }
                            }

                            @Override
                            public void onCancelled(@NonNull DatabaseError databaseError) {

                            }
                        });


                        reference = FirebaseDatabase.getInstance().getReference("Chats");
                        dialog = Utils.showLoader(MainChatActivity.this);

                        reference.addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                                ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(getSupportFragmentManager());
                                int unread = 0;
                                for (DataSnapshot snapshot : dataSnapshot.getChildren()){
                                    Chat chat = snapshot.getValue(Chat.class);
                                    if (chat.getReceiver().equals(me.getUser_id()) && !chat.isIsseen()){
                                        unread++;
                                    }
                                }

                                if (unread == 0){
                                    viewPagerAdapter.addFragment(ChatsFragment.newInstance(onItemClick), "Chats");
                                } else {
                                    viewPagerAdapter.addFragment(ChatsFragment.newInstance(onItemClick), "("+unread+") Chats");
                                }

                                viewPager.setAdapter(viewPagerAdapter);

                                tabLayout.setupWithViewPager(viewPager);
                                if(dialog!=null){
                                    dialog.dismiss();
                                }

                            }

                            @Override
                            public void onCancelled(@NonNull DatabaseError databaseError) {

                            }
                        });
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(MainChatActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
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


    @Override
    public void onItemCLick(String uid, View view) {

    }

    class ViewPagerAdapter extends FragmentPagerAdapter {

        private ArrayList<Fragment> fragments;
        private ArrayList<String> titles;

        ViewPagerAdapter(FragmentManager fm){
            super(fm);
            this.fragments = new ArrayList<>();
            this.titles = new ArrayList<>();
        }

        @Override
        public Fragment getItem(int position) {
            return fragments.get(position);
        }

        @Override
        public int getCount() {
            return fragments.size();
        }

        public void addFragment(Fragment fragment, String title){
            fragments.add(fragment);
            titles.add(title);
        }

        // Ctrl + O

        @Nullable
        @Override
        public CharSequence getPageTitle(int position) {
            return titles.get(position);
        }
    }

}
