class Flight

	attr_reader :number, :airline, :from, :to, :departure, :speed_kph, :bearing, :aircraft

	def initialize(options = {})
		options.each do |option, value|
			instance_variable_set :"@#{option}", value
		end

	 # @number = options[:number]
	 #  @airline = options[:airline]  
	 #  @from = options[:from]  
	 #  @from_lat = options [:from_lat]  
	 #  @from_lng = options[:from_lng]  
	 #  @to = options[:to] 
	 #  @to_lat = options[:to_lat]  
	 #  @to_lng = options[:to_lng]  
	 #  @departure = options[:departure]  
	 #  @speed_kph = options[:speed_kph]  
	 #  @bearing = options[:bearing]  
	 #  @aircraft = options[:aircraft]  
	end

	def estimated_duration
		# Find the estimated flight time- e.g. If an aircraft is flying at a speed of per hour, how long will it take to fly  miles?
		earth_radius_km = 6371

		# Convert the lat / lng from the from / to airports into radians
		from_lat_radians = self.from.lat * Math::PI / 180
		from_lng_radians = self.from.lng * Math::PI / 180
		to_lat_radians = self.to.lat * Math::PI / 180
		to_lng_radians = self.to.lng * Math::PI / 180

		# Calculate the distance between the start and end airports
		cosines_product = Math.cos(to_lat_radians) * Math.cos(from_lat_radians) * Math.cos(from_lng_radians - to_lng_radians)
		sines_product = Math.sin(to_lat_radians) * Math.sin(from_lat_radians)
		distance = earth_radius_km * Math.acos(cosines_product + sines_product)

		# Calculate the flight time
		speed = self.speed_kph
		hours = (distance / speed).round
		minutes = distance.remainder(speed).round
		puts "Estimated Flight Time for #{self.number}: #{hours} hours #{minutes} minutes"

		seconds = hours * 60 * 60 + minutes * 60
		Duration.new(seconds)
	end

end