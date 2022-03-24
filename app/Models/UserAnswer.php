<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $table = 'UserAnswer';

    protected $fillable = [
    	'user_id',
    	'survey_id',
        'question_id',
        'defined_answer_id',
        ];

    public function getKeyName(){
        return "user_answer_id";
    }
}
