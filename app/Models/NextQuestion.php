<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NextQuestion extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'NextQuestion';

     protected $fillable = [
        'next_question_id',
	    'defined_answer_id',
	    'question_id',
    ];

     public function getKeyName(){
        return "next_question_id";
    }
}
