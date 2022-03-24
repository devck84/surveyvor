<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

	public $timestamps = false;

    protected $table = 'Question';

    public function getKeyName(){
        return "question_id";
    }

    protected $fillable = [ 
    	'survey_id',
    	'next_question_id',
    	'question_text',
    	'question_type_id',
    	'required',
    	'sequence_number',
    ];
}
