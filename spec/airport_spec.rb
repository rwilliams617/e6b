require_relative 'spec_helper'

describe Airport do 

	before do
		@lhr = Airport.new(code: 'LHR', lat: 51.4700223, lng: -0.4542955)
		@jfk = Airport.new(code: 'JFK', lat: 40.6413111, lng: -73.77813909999999)
	end

	it "mass assigns the values" do 
		@lhr.code.must_equal 'LHR'
		@lhr.lat.must_equal 51.4700223
		@lhr.lng.must_equal -0.4542955
	end

	describe "distance_to" do 

		it "calculates the distance between the lat/lng points" do
			@lhr.distance_to(@jfk).must_equal 5540.013
		end
	end

	describe "to_radians" do
		it "converts the lat / lng into radians" do
			@lhr.to_radians.must_equal(lat: 0.8983213552099045 , lng: -0.0079289522519939)
		end
	end
end

