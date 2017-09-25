class Flight

	attr_reader :number, :airline, :from, :to, :departure, :speed_kph, :bearing, :aircraft

	def initialize(options = {})
		options.each do |option, value|
			instance_variable_set :"@#{option}", value
		end 
	end

	def estimated_duration
		distance = from.distance_to(to)
		hours = (distance / speed_kph)
		minutes = distance.remainder(speed_kph)
		# seconds = hours * 60 * 60 + minutes * 60
		seconds = distance / speed_kph * 3600
		puts "Estimated Flight Time for #{self.number}: #{hours} hours #{minutes} minutes"

		Duration.new(seconds)
	end

end