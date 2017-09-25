Airport = Struct.new(:code, :lat, :lng) do

	PI_IN_RADIANS = Math::PI / 180

	def initialize(**args)
		args.each do |method_name, value|
			self.send(:"#{method_name}=", value)
		end
	end

	def distance_to(airport)
		(Earth::RADIUS_KM * Math.acos(cosines_product(airport) + sines_product(airport))).round(3)
	end

	def to_radians
		{lat: lat * PI_IN_RADIANS, lng: lng * PI_IN_RADIANS}
	end

	private 
	def cosines_product(airport)
		Math.cos(airport.to_radians[:lat]) * Math.cos(self.to_radians[:lat]) * Math.cos(self.to_radians[:lng] - airport.to_radians[:lng])
	end

	def sines_product(airport)
		Math.sin(airport.to_radians[:lat]) * Math.sin(self.to_radians[:lat])
	end
end

