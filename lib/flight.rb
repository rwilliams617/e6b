class E6b::Flight
	
	attr_reader :number, :airline, :from, :to, :departure, :speed_kph, :bearing, :aircraft

	def initialize(options = {})
		options.each do |option, value|
			instance_variable_set :"@#{option}", value
		end 
	end

	def estimated_duration
		distance = from.distance_to(to)
		seconds = distance / speed_kph * 3600
		Duration.new(seconds)
	end

	def to_s 
		"Estimated Flight Time for #{self.number}: #{estimated_duration.hours.round} hours #{estimated_duration.minutes.round} minutes"
	end

	def fuel_consumption
		total_fuel = 50
		(total_fuel / (estimated_duration.minutes / 60 + estimated_duration.hours)).round(2)
	end

end




