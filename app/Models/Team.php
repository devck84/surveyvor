<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

     public $timestamps = false;

     protected $table = 'Team';

     protected $fillable = [
     	'user_id',
     	'team_name',
     	'team_description',
     	'team_url_invitation',
     ];

    public function getKeyName(){
        return "team_id";
    }
}
