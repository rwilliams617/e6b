require 'minitest/autorun'
require 'minitest/pride'

require './lib/flight'

describe "Flight" do 

	before do 
		@flight = Flight.new(
		:number => 'BA-12345',
	  :airline => 'British Airways',
	  :from => "LHR",
	  :from_lat => 51.4700223,
	  :from_lng => -0.4542955,
	  :to => "JFK",
	  :to_lat => 40.6413111,
	  :to_lng => -73.77813909999999,
	  :departure => Time.utc(2014, 11, 1, 14, 47),
	  :speed_kph => 790,
	  :bearing => 3,
	  :aircraft => "Boeing 747"
		)
	end

	it "mass initializes the values" do 
		@flight.number.must_equal 'BA-12345'
		@flight.airline.must_equal "British Airways"
	  @flight.from.must_equal "LHR"
	  @flight.from_lat.must_equal 51.4700223
	  @flight.from_lng.must_equal -0.4542955
	  @flight.to.must_equal "JFK"
	  @flight.to_lat.must_equal 40.6413111
	  @flight.to_lng.must_equal -73.77813909999999
	  @flight.departure.must_equal Time.utc(2014, 11, 1, 14, 47)
	  @flight.speed_kph.must_equal 790
	  @flight.bearing.must_equal 3
	  @flight.aircraft.must_equal "Boeing 747"
	end

end
