package es.system.dc.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Menu;
import android.widget.Toast;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.navigation.NavigationView;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.appcompat.app.AppCompatActivity;
import com.google.gson.Gson;
import es.system.dc.R;
import es.system.dc.adapter.SurveyAdapter;
import es.system.dc.databinding.ActivitySurveyListedBinding;
import es.system.dc.model.Survey;
import es.system.dc.model.SurveyRaw;
import es.system.dc.model.TokenApp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SurveyListedActivity extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private ActivitySurveyListedBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivitySurveyListedBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        setSupportActionBar(binding.appBarSurveyListed.toolbar);

        DrawerLayout drawer = binding.drawerLayout;

        NavigationView navigationView = binding.navView;
        mAppBarConfiguration = new AppBarConfiguration.Builder( R.id.nav_my_profile,
                es.system.dc.R.id.nav_home, es.system.dc.R.id.nav_gallery, es.system.dc.R.id.nav_slideshow, R.id.nav_pending_invitation)
                .setOpenableLayout(drawer)
                .build();
        NavController navController = Navigation.findNavController(this, es.system.dc.R.id.nav_host_fragment_content_survey_listed);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);

    }
    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, es.system.dc.R.id.nav_host_fragment_content_survey_listed);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }


}