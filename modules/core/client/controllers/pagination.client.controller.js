'use strict';

angular.module('pagination').controller('paginationController', function() {

    /*
    Use 'controller as' syntax
    set paginationItemList to whatever you want to repeat over
    */

    this.paginationItemList = [];
    this.itemsPerPage = 10;
    this.pageSizeInput = 10;
    this.currentPage = 1;
    this.search = '';
    var vm = this;
    this.initComplete = false;

    this.filteredData = [];
    this.keysToSearch = [];

    this.initFilteredData = function(done) {
        if(done.$$state.value.$resolved !== undefined && done.$$state.value.$resolved && !vm.initComplete) {
            vm.initComplete = true;
            this.currentPage = 1;
            this.filteredData = this.paginationItemList;
            this.filteredData = this.filteredData.filter(searchFilter);
        }
    };

    function searchFilter(item) {
        for (var i = 0; i < vm.keysToSearch.length; i++) {
            if (item.hasOwnProperty(vm.keysToSearch[i])) {
                if(item[vm.keysToSearch[i]].toLowerCase().indexOf(vm.search.toLowerCase()) > -1) {
                    return true;
                }

                /*
                if(typeof item[key] === 'string') {
                    if(item[key].toLowerCase().indexOf(vm.search.toLowerCase()) > -1) {
                        return true;
                    }
                }
                */
            }
        }

        return false;
    }

    this.searchChange = function() {
        this.currentPage = 1;
        this.filteredData = this.paginationItemList;
        this.filteredData = this.filteredData.filter(searchFilter);
    };


    this.getPageNumbers = function() {
        var numOfPages = this.totalPages();
        var pageNums = [];
        var precut, postcut, i;

        if(numOfPages > 9) {
            if(vm.currentPage > 5) {
                precut = true;
            }
            if(vm.currentPage < (numOfPages - 4)) {
                postcut = true;
            }
        }

        if(precut && postcut) {
            pageNums.push(1);
            pageNums.push('...');

            pageNums.push(vm.currentPage - 2);
            pageNums.push(vm.currentPage - 1);
            pageNums.push(vm.currentPage);
            pageNums.push(vm.currentPage + 1);
            pageNums.push(vm.currentPage + 2);
            
            pageNums.push('...');
            pageNums.push(numOfPages);
        }
        else if(precut) {
            pageNums.push(1);
            pageNums.push('...');
            for(i = numOfPages - 6; i <= numOfPages; i++ ) {
                pageNums.push(i);     
            }
        }
        else if(postcut) {
            for(i = 1; i <= 7; i++ ) {
                pageNums.push(i);     
            }
            pageNums.push('...');
            pageNums.push(numOfPages);
        }
        else {
            for(i = 1; i <= numOfPages; i++ ) {
                pageNums.push(i);     
            }
        }

        return pageNums;
    };

    this.totalPages = function() {
        return Math.ceil(this.filteredData.length / this.itemsPerPage);
    };

    this.setPageSize = function(pageSize) {
        if(!pageSize) {
            pageSize = 10;
        }
        this.itemsPerPage = pageSize;
        this.currentPage = 1;
    };

    this.setPage = function(page) {
        this.currentPage = page;
    };

});

angular.module('pagination').filter('startFrom', function() {
    console.log('filter running');
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});


/*

HTML to add to view:
(replace TK with controller alias)


<!-- Search input -->
<input type="text" data-ng-model="TK.search" ng-change="TK.searchChange()" default="''">

<!-- Clear search input -->
<button ng-click="TK.search=''; TK.searchChange()">X</button>

<!-- Set data to repeat -->
{{TK.paginationItemList=DEISRED_LIST_DATA;''}}


<!-- Actual repeating object -->
<tr ng-repeat="REPEAT_ITEM_NAME in TK.filteredData | startFrom:(TK.currentPage-1)*TK.itemsPerPage | limitTo:TK.itemsPerPage" ng-click="" class="">


<!-- Page navigation buttons -->
<div class="btn-toolbar btn-group paginationPageNavigationControl" role="toolbar" ng-hide="TK.totalPages()==1">
    <!-- First page button -->
    <button class="btn btn-group btn-default paginationButton" ng-click="TK.setPage(1)" ng-disabled="TK.currentPage==1" role="group">&laquo</button>
    <!-- Previous page button -->
    <button class="btn btn-group btn-default paginationButton" ng-click="TK.setPage(TK.currentPage-1)" ng-disabled="TK.currentPage==1" role="group">‹</button>

    <button ng-repeat="page in TK.getPageNumbers() track by $index" ng-click="TK.setPage(page)" class="btn btn-group btn-default paginationButton" ng-class="{ paginationButtonActive: TK.currentPage==page }" role="group" ng-disabled="page=='...'">{{page}}</button>

    <!-- Next page button -->
    <button class="btn btn-group btn-default paginationButton" ng-click="TK.setPage(TK.currentPage+1)" ng-disabled="TK.currentPage==TK.totalPages()" role="group">›</button>
    <!-- Last page button -->
    <button class="btn btn-group btn-default paginationButton" ng-click="TK.setPage(TK.totalPages())" ng-disabled="TK.currentPage==TK.totalPages()" role="group">&raquo</button>
</div>

<!-- Page size input -->
<div class="paginationPageSizeControl">
    Items per page: 
    <input type="number" class="form-control paginationPageSizeInput" data-ng-model="TK.pageSizeInput" ng-change="TK.setPageSize(TK.pageSizeInput)">
</div>


*/