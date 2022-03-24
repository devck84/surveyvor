<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'TeamMember';

    protected $fillable = [
    	'user_id',
    	'team_id',
    	'date_registered',
    ];

    public function getKeyName(){
        return "team_member_id";
    }

}
