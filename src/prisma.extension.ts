import { PrismaClient } from "@prisma/client";

type LatLng = {
  latitude: number;
  longitude: number;
};

type Point = {
  placeId: number;
  location: LatLng;
};

export const extendedPrismaClient = new PrismaClient().$extends({
  model: {
    point: {
      async create(data: {
        placeId: number;
        latitude: number;
        longitude: number;
      }) {
        // Create an object using the custom types from above
        const poi: Point = {
          placeId: data.placeId,
          location: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
        };

        // Insert the object into the database
        const point = `POINT(${poi.location.latitude} ${poi.location.longitude})`;
        await extendedPrismaClient.$queryRaw`
          INSERT INTO "Point" (name, location) VALUES (${poi.placeId}, ST_GeomFromText(${point}, 4326));`;

        // Return the object
        return poi;
      },

      async findClosestPoints(latitude: number, longitude: number) {
        // Query for clostest points of interests
        const result = await extendedPrismaClient.$queryRaw<
          {
            id: number | null;
            name: string | null;
            st_x: number | null;
            st_y: number | null;
          }[]
        >`SELECT id, name, ST_X(location::geometry), ST_Y(location::geometry) 
            FROM "Point" 
            ORDER BY ST_DistanceSphere(location::geometry, ST_MakePoint(${latitude}, ${longitude})) DESC`;

        // Transform to our custom type
        const pois: Point[] = result.map((data) => {
          return {
            placeId: parseInt(data.name),
            location: {
              latitude: data.st_x || 0,
              longitude: data.st_y || 0,
            },
          };
        });

        // Return data
        return pois;
      },

      async findPointsWithinRadius(
        latitude: number,
        longitude: number,
        radius: number,
      ) {
        // Query for clostest points of interests
        const result = await extendedPrismaClient.$queryRaw<
          {
            id: number | null;
            name: string | null;
            st_x: number | null;
            st_y: number | null;
          }[]
        >`SELECT id, name, ST_X(location::geometry), ST_Y(location::geometry) 
            FROM "Point" 
            WHERE ST_DistanceSphere(location::geometry, ST_MakePoint(${latitude}, ${longitude})::geometry) <= ${radius}
            `;

        // Transform to our custom type
        const pois: Point[] = result.map((data) => {
          return {
            placeId: parseInt(data.name),
            location: {
              latitude: data.st_x || 0,
              longitude: data.st_y || 0,
            },
          };
        });

        // Return data
        return pois;
      },
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
