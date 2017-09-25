require_relative 'spec_helper'

describe Airport do 

	before do
		@airport = Airport.new(code: 'LHR', lat: 51.4700223, lng: -0.4542955)
	end

	it "mass assigns the values" do 
		@airport.code.must_equal 'LHR'
		@airport.lat.must_equal 51.4700223
		@airport.lng.must_equal -0.4542955
	end
end