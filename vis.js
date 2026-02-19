const dataWide ="/datasets/videogames_wide.csv";
const dataLong ="/datasets/videogames_long.csv";

async function fetchData(dataSource) {
  const data = await d3.csv(dataSource);
  return data;
}


async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}

// Specified colours for the genres, per built-in JS colours
genreColours = [
  "crimson",
  "darkcyan",
  "cornsilk",
  "darkseagreen",
  "deeppink",
  "lavendar",
  "lightblue",
  "darkred",
  "sandybrown",
  "slategray",
  "turquoise",
  "darkmagenta",
];

fetchData(dataWide).then(async (data) => {

  // ----------- GLOBAL SALES BY GENRE AND PLATFORM --------------

  const globalSalesByGenrePlatform = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldQ('Global_Sales').aggregate('sum')
        .axis({ title: "Global Sales (millions of units)" }),
      vl.x().fieldO('Platform'),
      vl.color().fieldN('Genre').scale({range: genreColours}),
      vl.tooltip([
        { field: 'Genre', 
          type: 'nominal', 
          title: 'Genre'
        },
        { field: 'Global_Sales', 
          type: 'quantitative', 
          aggregate: 'sum', 
          title: 'Global Sales (millions of units)',
        }
      ])
    )
    .title('Global Sales by Genre and Platform')
    .width("container")
    .height(400)
    .toSpec();

  const globalSalesByGenrePlatformV2 = vl
    .markBar()
    .data(data)
    .transform(
      vl.filter('datum["Genre"] == "Puzzle"'),
      vl.filter('datum["Publisher"] == "Nintendo"'),
    )
    .encode(
      vl.y().fieldQ('Global_Sales').aggregate('sum')
        .axis({ title: "Global Sales (millions of units)" }),
      vl.x().fieldO('Platform').sort("-y"),
      vl.color().fieldN("Name").sort("-y")
        .legend({ title: 'Game Title', symbolLimit: 100, columns: 3, labelLimit: 300, orient: 'bottom' }),
      vl.tooltip([
        { field: 'Genre', 
          type: 'nominal', 
          title: 'Genre'
        },
        { field: 'Name', 
          type: 'nominal', 
          title: 'Name'
        },
        { field: 'Global_Sales', 
          type: 'quantitative', 
          aggregate: 'sum', 
          title: 'Global Sales (millions of units)',
        }
      ])
    )
    .title('Global Sales of Nintendo Puzzle Games by Platform')
    .width("container")
    .height(400)
    .toSpec();

  // ----------- SALES OVER TIME BY PLATFORM AND GENRE -----------
  const SalesOverTimePlatformGenre = vl
    .markLine( {point: 'true'} )
    .data(data)
    .transform(
      vl.filter('datum["Year"] > 1979 && datum["Year"] <= 2016 ')
    )
    .encode(
    vl.y().fieldQ('Global_Sales').aggregate('sum')
      .title('Global Sales (millions of units)'),
    vl.x().fieldO('Year'),
    vl.row().fieldN('Genre'),
    vl.color().fieldN('Platform')
      .legend({ symbolLimit: 100, columns: 7, orient: 'top' }),
  
    vl.tooltip([
        { field: 'Platform', 
          type: 'nominal', 
        },
        { field: 'Year', 
          type: 'ordinal', 
        },
        { field: 'Global_Sales', 
          type: 'quantitative', 
          aggregate: "sum", 
          title: 'Global Sales (millions of units)',
        }
      ])  
    )
    .width("container")
    .height(400)
    .toSpec();

  // ----------- WORST SELLING STRATEGY GAMES -----------
  const test = vl
    .markPoint()
    .data(data)
      .transform(
        vl.filter('datum["Year"] > 1979 && datum["Year"] <= 2016 '),
        vl.filter('datum["Genre"] == "Strategy"'),
        vl.filter('datum["Global_Sales"] < .05')
      )
    .encode(
      vl.y().fieldQ('Global_Sales').aggregate('sum')
        .axis({ title: "Global Sales (millions of units)" }),
      vl.x().fieldN('Name').sort('y').title('Strategy Game Titles')
      .axis({title:'Strategy Game Names'}),
      
      vl.tooltip([
        { field: 'Name', 
          type: 'nominal',
          title: 'Game Name'
        },
        { field: 'Global_Sales', 
          type: 'quantitative', 
          aggregate: "sum", 
          title: 'Global Sales (millions of units)',
        }
      ])  
    )
    .title('Global Sales by Genre and Platform')
    .width("2000")
    .height(300)
    .toSpec();


  // ----------- REGIONAL SALES VS PLATFORM --------------
  const regionalSalesVPlatform = vl.vconcat(
    vl.markRect()
    .data(data)
      .transform(
        vl.filter('datum["Year"] > 1979 && datum["Year"] <= 2016 '),
        vl.filter('datum["NA_Sales"] > 0')
      )
    .encode(
      vl.x().fieldO('Year'),
      vl.y().fieldN('Platform'),
      vl.color().fieldQ('NA_Sales').aggregate('sum')
        .legend({ title: 'Regional Sales (millions of units)', orient: 'top' }),
      vl.tooltip([
          { field: 'Year', 
            type: 'ordinal', 
          },
          { field: 'Platform', 
            type: 'nominal', 
          },
          { field: 'NA_Sales', 
            type: 'quantitative', 
            aggregate: 'sum', 
            title: 'NA Sales (millions of units)',

          },
        ])  
    )
    .title('Regional Sales: North America (millions of units)')
    .height(400)
    .width("container"),

    vl.markRect()
    .data(data)
      .transform(
        vl.filter('datum["Year"] > 1979 && datum["Year"] <= 2016 '),
        vl.filter('datum["JP_Sales"] > 0')
      )
    .encode(
      vl.x().fieldO('Year'),
      vl.y().fieldN('Platform'),
      vl.color().fieldQ('JP_Sales').aggregate('sum')
        .legend({ title: 'Regional Sales (millions of units)', orient: 'top' }),
      vl.tooltip([
          { field: 'Year', 
            type: 'ordinal', 
          },
          { field: 'Platform', 
            type: 'nominal', 
          },
          { field: 'JP_Sales', 
            type: 'quantitative', 
            aggregate: 'sum', 
            title: 'JP Sales (millions of units)',

          },
        ])  
    )
    .title('Regional Sales: Japan (millions of units)')
    .height(400)
    .width("container"),

    vl.markRect()
    .data(data)
      .transform(
        vl.filter('datum["Year"] > 1979 && datum["Year"] <= 2016 '),
        vl.filter('datum["EU_Sales"] > 0')
      )
    .encode(
      vl.x().fieldO('Year'),
      vl.y().fieldN('Platform'),
      vl.color().fieldQ('EU_Sales').aggregate('sum')
        .legend({ title: 'Regional Sales (millions of units)', orient: 'top' }),
      vl.tooltip([
          { field: 'Year', 
            type: 'ordinal', 
          },
          { field: 'Platform', 
            type: 'nominal', 
          },
          { field: 'EU_Sales', 
            type: 'quantitative', 
            aggregate: 'sum', 
            title: 'EU Sales (millions of units)',

          },
        ])  
    )
    .title('Regional Sales: Europe (millions of units)')
    .height(400)
    .width("container")
  )
  .toSpec();


  render("#view1", globalSalesByGenrePlatform);
  render("#view2", globalSalesByGenrePlatformV2);
  render("#view3", SalesOverTimePlatformGenre);
  render("#view4", test);
  render("#view5", regionalSalesVPlatform);
});

fetchData(dataLong).then(async (data) => {

  // ----------- PS2 GAME SALES BY REGION --------------

  const PS2SalesPerRegion = vl
    .markLine({ point: 'true' })
    .data(data)
      .transform(
        vl.filter('datum["year"] > 1979 && datum["year"] <= 2016 '),
        vl.filter('datum["platform"] == "PS2"')
      )
    .encode(
      vl.y().fieldQ('sales_amount').aggregate('sum')
        .axis({ title: 'Sales Amount for PS2 Games' }),
      vl.x().fieldO('year')
        .axis({ title: 'Year' }),
      vl.color().fieldN('sales_region')
        .legend({ title: 'Sales Region' }),
      vl.tooltip([
          { field: 'year', 
            type: 'ordinal', 
            title: 'Year'
          },
          { field: 'platform', 
            type: 'nominal', 
            title: 'Platform'
          },
          { field: 'sales_amount', 
            type: 'quantitative', 
            aggregate: 'sum', 
            title: 'Sales amount (millions of units)',

          },
        ])  
    )
    .title('Sales Amount for PS2 per Region')
    .width("container")
    .height(400)
    .toSpec();



  // ----------- VISUAL STORY --------------

  // ----------- JAPAN-BASED COMPANIES --------------
  const JapanBasedPublisherGameSales = 
  
  vl.vconcat(

    vl.markArea({ point: 'true', opacity: '1' })
      .data(data)
        .transform(
          vl.filter('datum["year"] > 1989 && datum["year"] <= 2016 '),
          vl.filter('datum["publisher"] == "Nintendo"'),
          vl.filter('datum["sales_region"] == "jp_sales" || datum["sales_region"] == "na_sales"')
        )
      .encode(
        vl.y().fieldQ('sales_amount').aggregate('sum')
          .axis({ title: 'Nintendo Game Sales' }),
        vl.x().fieldO('year')
          .axis({ title: 'Year' }),
        vl.color().fieldN('sales_region')
          .legend({ title: 'Sales Region', orient: 'top' }),
        vl.tooltip([
            { field: 'year', 
              type: 'ordinal', 
              title: 'Year'
            },
            { field: 'sales_amount', 
              type: 'quantitative', 
              aggregate: 'sum', 
              title: 'Region Sales (millions of units)'
            },
          ])  
      )
      .width("container")
      .height(400),

      vl.markArea({ point: 'true', opacity: '1' })
      .data(data)
        .transform(
          vl.filter('datum["year"] > 1989 && datum["year"] <= 2016 '),
          vl.filter('datum["publisher"] == "Sega"'),
          vl.filter('datum["sales_region"] == "jp_sales" || datum["sales_region"] == "na_sales"')
        )
      .encode(
        vl.y().fieldQ('sales_amount').aggregate('sum')
          .axis({ title: 'Sega Game Sales' }),
        vl.x().fieldO('year')
          .axis({ title: 'Year' }),
        vl.color().fieldN('sales_region')
          .legend({ title: 'Sales Region' }),
        vl.tooltip([
            { field: 'year', 
              type: 'ordinal', 
              title: 'Year'
            },
            { field: 'sales_amount', 
              type: 'quantitative', 
              aggregate: 'sum', 
              title: 'Region Sales (millions of units)'
            },
          ])  
      )
      .width("container")
      .height(400)
    )
    .title({ text: "Sales of Games Created by Japan-based Publishers", anchor: "middle"})
    .toSpec();



    // ----------- AMERICA-BASED COMPANIES --------------
  const NABasedPublisherGameSales = 
  
  vl.vconcat(
    vl.markArea({ point: 'true', opacity: '1' })
      .data(data)
        .transform(
          vl.filter('datum["year"] > 1993 && datum["year"] <= 2016 '),
          vl.filter('datum["publisher"] == "Electronic Arts"'),
          vl.filter('datum["sales_region"] == "jp_sales" || datum["sales_region"] == "na_sales"')
        )
      .encode(
        vl.y().fieldQ('sales_amount').aggregate('sum')
          .axis({ title: 'Electronic Arts Game Sales' }),
        vl.x().fieldO('year')
          .axis({ title: 'Year' }),
        vl.color().fieldN('sales_region')
          .legend({ title: 'Sales Region', orient: 'top' }),
        vl.tooltip([
            { field: 'year', 
              type: 'ordinal', 
              title: 'Year'
            },
            { field: 'sales_amount', 
              type: 'quantitative', 
              aggregate: 'sum', 
              title: 'Region Sales (millions of units)'
            },
          ])  
      )
      .width("container")
      .height(400),

      vl.markArea({ point: 'true', opacity: '1' })
      .data(data)
        .transform(
          vl.filter('datum["year"] > 1993 && datum["year"] <= 2016 '),
          vl.filter('datum["publisher"] == "Activision"'),
          vl.filter('datum["sales_region"] == "jp_sales" || datum["sales_region"] == "na_sales"')
        )
      .encode(
        vl.y().fieldQ('sales_amount').aggregate('sum')
          .axis({ title: 'Activision Game Sales' }),
        vl.x().fieldO('year')
          .axis({ title: 'Year' }),
        vl.color().fieldN('sales_region')
          .legend({ title: 'Sales Region' }),
        vl.tooltip([
            { field: 'year', 
              type: 'ordinal', 
              title: 'Year'
            },
            { field: 'sales_amount', 
              type: 'quantitative', 
              aggregate: 'sum', 
              title: 'Region Sales (millions of units)'
            },
          ])  
      )
      .width("container")
      .height(400)
    )
    .title({ text: "Sales of Games Created by America-based Publishers", anchor: "middle"})
    .toSpec();

  render("#view6", PS2SalesPerRegion);
  render("#view7", JapanBasedPublisherGameSales);
  render("#view8", NABasedPublisherGameSales);
});


// --- ASSIGNMENT 2 -----------------------------------------------------------

let circles = document.querySelectorAll("circle");

circles.forEach((circle) => {
  circle.addEventListener("click", () => {
    if (circle.getAttribute("fill") == "red") {
      circle.setAttribute("fill", "black");
    } else {
      circle.setAttribute("fill", "red");
    }
  });
});
