require_relative 'spec_helper'

describe Flight do 
	
	before do 
		@lhr = Airport.new(code: 'LHR', lat: 51.4700223, lng: -0.4542955)
		@jfk = Airport.new(code: 'JFK', lat: 40.6413111, lng: -73.77813909999999)

		@flight = Flight.new(
		:number => 'BA-12345',
	  :airline => 'British Airways',
	  :from => @lhr,
	  :to => @jfk,
	  :departure => Time.utc(2014, 11, 1, 14, 47),
	  :speed_kph => 790,
	  :bearing => 3,
	  :aircraft => "Boeing 747"
		)
	end

	it "mass initializes the values" do 
		@flight.number.must_equal 'BA-12345'
		@flight.airline.must_equal "British Airways"
	  @flight.from.must_equal @lhr
	  @flight.to.must_equal @jfk
	  @flight.departure.must_equal Time.utc(2014, 11, 1, 14, 47)
	  @flight.speed_kph.must_equal 790
	  @flight.bearing.must_equal 3
	  @flight.aircraft.must_equal "Boeing 747"
	end

	describe "estimated_duration" do 
		before do 
			@result = @flight.estimated_duration
		end

		it "calcualtes the hours and minutes of the flight time" do 
			@result.must_equal Duration.new(25245.62886075949)
			@result.hours.must_equal 7.012674683544303
			@result.minutes.must_equal 0.7604810126581772
		end
	end

	describe "to_s" do
		it "displays the estimated flight time" do
			@flight.to_s.must_equal "Estimated Flight Time for BA-12345: 7 hours 1 minutes"
		end
	end

end
