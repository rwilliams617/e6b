class Flight

	

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
		hours = 7
		minutes = 10.0
		total_fuel / (minutes / 60 + hours).round(3)
	end

end




