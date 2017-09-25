Airport = Struct.new(:code, :lat, :lng) do

	def initialize(**args)
		args.each do |method_name, value|
			self.send(:"#{method_name}=", value)
		end
	end

	def distance_to(airport)
		# Find the estimated flight time- e.g. If an aircraft is flying at a speed of per hour, how long will it take to fly  miles?
		earth_radius_km = 6371
		# Convert the lat / lng from the from / to airports into radians
		from_lat_radians = self.lat * Math::PI / 180
		from_lng_radians = self.lng * Math::PI / 180
		to_lat_radians = airport.lat * Math::PI / 180
		to_lng_radians = airport.lng * Math::PI / 180

		# Calculate the distance between the start and end airports
		cosines_product = Math.cos(to_lat_radians) * Math.cos(from_lat_radians) * Math.cos(from_lng_radians - to_lng_radians)
		sines_product = Math.sin(to_lat_radians) * Math.sin(from_lat_radians)
		distance = (earth_radius_km * Math.acos(cosines_product + sines_product)).round(3)
	end

end

		# :from => "LHR",
	 #  :from_lat => 51.4700223,
	 #  :from_lng => -0.4542955
	 #  :to_lat => 40.6413111,
	 #  :to_lng => -73.77813909999999,