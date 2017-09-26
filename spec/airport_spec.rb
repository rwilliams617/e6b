require_relative 'spec_helper'

describe Airport do 

	before do
		@lhr = Airport.new(code: 'LHR')
		@jfk = Airport.new(code: 'JFK')
	end

	it "mass assigns the values" do 
		@lhr.code.must_equal 'LHR'
		@lhr.lat.must_equal 51.4700223
		@lhr.lng.must_equal -0.4542955
	end

	
end

