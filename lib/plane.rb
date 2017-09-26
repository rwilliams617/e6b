class Plane

	def convert
		@celsius = 0
		(@celsius * 1.8) + 32
	end

	def true_airspeed
		@altitude = 15000
    @indicated_airspeed = 10
    @indicated_airspeed * (1 + @altitude/1000 * 0.02)
	end

end

     