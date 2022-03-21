<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'Survey';

     protected $fillable = [
        'team_id',
            'privacy_id',
            'survey_name',
            'survey_description',
            'button_color',
            'background_color',
            'active',
            'date_created',
            'user_id',
    ];

     public function getKeyName(){
        return "survey_id";
    }

}
