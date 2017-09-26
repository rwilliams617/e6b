require_relative 'spec_helper'

describe Point do
	before do 
		@point = Point.new(lat: 51.4700223, lng: -0.4542955)
		@jfk = Point.new(lat: 40.6413111, lng: -73.77813909999999)
	end

	describe "distance_to" do 

		it "calculates the distance between the lat/lng points" do
			@point.distance_to(@jfk).must_equal 5540.013
		end
	end

	describe "to_radians" do
		it "converts the lat / lng into radians" do
			@point.to_radians.must_equal(lat: 0.8983213552099045 , lng: -0.0079289522519939)
		end
	end
end